import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random
import json
import pickle

with open('uit_intents.json') as file:
    data = json.load(file)

# print(data["intents"])



# if you want to make changes to the model you will have to delete the saved model files or rename them.

words = [] #patterns twy ko extend lote
labels = [] #tags twy
docs_x = []#patterns twy ko append lote
docs_y = []#tags twy ko append lote

for intent in data['intents']:
    for pattern in intent['patterns']:
        wrds = nltk.word_tokenize(pattern)
        words.extend(wrds)
        # print("words", words)
        docs_x.append(wrds)  # pattern twy
        # print("doc_x" , docs_x)
        docs_y.append(intent["tag"])  # pattern twy yk tags twy
        # print("doc_y", docs_y)
        # print("____________")

    if intent['tag'] not in labels:
        labels.append(intent['tag'])
        # print("labels",labels)


# print(words)
words = [stemmer.stem(w.lower()) for w in words if w != "?"]
# print("stemmed words", words)
words = sorted(list(set(words)))
# print("sorted words", words)

labels = sorted(labels)
print("sorted labels", labels)
print("no. of labels", len(labels)) #40
print("doc_x is", docs_x)
print("lenght of doc_x", len(docs_x)) #208


#Bag of Words
training = []
output = []

out_empty = [0 for _ in range(len(labels))]
print("out empty is", out_empty)  #labels(tags) bag of words

for x, doc in enumerate(docs_x):
    print(x)
    print(doc)
    bag = []

    wrds = [stemmer.stem(w.lower()) for w in doc]
    print("wrds is" ,wrds)
    #
    print("words is", words)

    for w in words:
        if w in wrds:
            bag.append(1)  # frequency bl lout shi shi, shi tr nk 1 htr
        else:
            bag.append(0)
    print("bag is" ,bag)

    output_row = out_empty[:]
    # print("output_row is" , output_row)
    # print("x is " , x)
    print("labels is ", labels)
    output_row[labels.index(docs_y[x])] = 1
    print("output_row is ", output_row)

    training.append(bag)

    output.append(output_row)
    print("_____")

print("training is ", training)
print("output is ", output)

training = numpy.array(training)
output = numpy.array(output)
print("numpy training is ", len(training)) #208
print("numpy output is ", len(output)) #208
print("length of output is", len(output[0])) #40

#setup the model (feed-forward neural network with two hidden layers)
tensorflow.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])]) #input shape ko define lote tl. each training input is same length. #139
net = tflearn.fully_connected(net, 63) #63 neurons
net = tflearn.fully_connected(net, 63) #63 neurons
net = tflearn.fully_connected(net, len(output[0]), activation="softmax") #each neuron repensents a specific label
net = tflearn.regression(net)

model = tflearn.DNN(net)

#train the data
model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
#The number of epochs we set is the amount of times that the model will see the same information while training
model.save("model_uit_test.tflearn")
# print("length of training is", len(training[0])) #139
# print("length of output is", len(output[0]))   #34


#predictions
def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)

def chat():
    print("Start talking with the bot (type quit to stop)!")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break

        results = model.predict([bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results) #give the index of the greatest value
        tag = labels[results_index]

        print("tag is " ,tag)
        print("results are " , results)
        print("result index is", results_index)
        print("predicted result is ", results[results_index])
        if results[results_index] > 0.7:
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg['responses']
            print(random.choice(responses))

        else:
            print("I didn't get that, try again")

chat();
