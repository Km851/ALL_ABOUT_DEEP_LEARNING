# Deep Learning
## Prerequisites
### Numpy
#### Import
##### import numpy as np
#### Defining Array
##### #Defining a 1-D array
a=np.array([1,2,3])
#Defining a 2-D array
b=np.array([[9,0,8,7,0],[0,2,5,4,5]])
#defining a 3-D array
c=np.array([[[1,2],[3,4]],[[5,6],[7,8]]])
#### Shape of Array
##### print(a.shape)
print(b.shape)
#### Dimentions of Array
##### print(a.ndim)
print(b.ndim)
#### Type of Array
##### print(a.dtype)
print(b.dtype)
#### Size of Array
##### #size in bytes of each element
print(a.itemsize)
#total size in bytes manually
print(a.size*a.itemsize)
#total size in bytes by defined function
print(a.nbytes)
#### Slicing
##### print( d[1, -1] )
print( d[0, :] )
print( d[:, 2] )
print( d[0, 1:5:2] )
#### Arrays Filled With
##### #arrays filled with zeros
print(np.zeros((2,3,3)))
print(np.zeros((2,3)))
print(np.zeros((2)))
#arrays filled with ones
print(np.ones((4,2,2),dtype='int32'))
#arrays filled with specific no.
print(np.full((2,2),99))
#array with shape same as a but filled with 4
print(np.full_like(a,4))
#### Random
##### print(np.random.rand(4,2))
#randdom decimal with the same shape as a
print(np.random.random_sample(a.shape))
#3X3 array filled with random integers b/w 4 and 8
print(np.random.randint(-4,8,size=(3,3)))
#### Identity Matrix
##### print(np.identity(5))
#### Repeat
##### arr = np.array([[1, 2],
[3, 4]])
print(np.repeat(arr, 2, axis=0))
[[1, 2],
[1, 2],
[3, 4],
[3, 4]]
print(np.repeat(arr, 2, axis=1))
[[1, 1, 2, 2],
[3, 3, 4, 4]]
print(np.repeat(arr, 2))
[1, 1, 2, 2, 3, 3, 4, 4]
#### Refrence VS Copy
##### #The reference issue: changing 'h' also changes 'g'
g=np.array([1,2,3])
h=g
h[0] = 100
print(g)
[100   2   3]
#A true copy: changing 'j' does NOT change 'i'
j=np.array([1,2,3])
i=j.copy()
j[0] = 100
print(i)
[1 2 3]
#### Math
##### #Math
k=np.array([1,2,3,4])
k=k+2
print(k)
k=k-2
print(k)
k=k/2
print(k)
l=k+k
print(l)
l=l**2
print(l)
l=np.sin(l)
print(l)
l=np.cos(l)
print(l)
#Multplying 2 matrix
m=np.ones((2,3))
print(m)
n=np.full((3,2),2)
print(n)
print(np.matmul(m,n))
#deteminant of matrix
o=np.identity(3)
print(o)
print(np.linalg.det(o))
#Statistics: Finding minimum (down columns), maximum (overall), and sum (across rows)
p=np.array([[1,2,3],[4,5,6]])
print(np.min(p,axis=0))
print(np.max(p))
print(np.sum(p,axis=1))
[1 2 3]
6
[ 6 15]
#### Array Manipulation
##### #array manuipualtion
q=np.array([[1,2,3,4],[5,6,7,8]])
print(q)
r=q.reshape((4,2))
print(r)
#2X4 to 4X2
[[1 2 3 4]
[5 6 7 8]]
[[1 2]
[3 4]
[5 6]
[7 8]]
#Vertical stacking
s=np.array([1,2,3,4])
t=np.array([5,6,7,8])
print(np.vstack([s,t,s]))
[[1 2 3 4]
[5 6 7 8]
[1 2 3 4]]
#Horixontal stack
u=np.array([1,2,3,4])
v=np.array([5,6,7,8])
print(np.hstack([u,v,v]))
[1 2 3 4 5 6 7 8 5 6 7 8]
#### Importing txt file and Conditions
##### #importing
w=np.genfromtxt('WeImportNow.txt',delimiter=',')
w=w.astype('int32')
print(w)
#Boolean Masking: Returning an array of True/False
print(w>10)
#Advanced Indexing: keeping elements > 10 ---")
print(w[w>10])
#Conditional Checks: ANY elements > 10 down columns (axis=0) or rows (axis=1)?
print(np.any(w>10,axis=0))
print(np.any(w>10,axis=1))
#Conditional Checks: Are ALL elements > 10 down columns?
print(np.all(w>10,axis=0))
#Multiple Conditions: Elements > 10 AND < 15
print((w>10) & (w<15))
#Multiple Conditions: NOT (~) operator, reversing the previous condition
print(~((w>10) & (w<15)))
### Pandas
#### Import
##### import pandas as pd
import numpy as np
#### Series
##### Defining
###### data = [100 , 102, 104]
series = pd.Series(data)
print(series)
# 0    100
# 1    102
# 2    104
# dtype: int64
##### Changing Indexing
###### series1 = pd.Series(data , index =["a","b","c"])
print(series1)
# a    100
# b    102
# c    104
# dtype: int64
##### seaching value using index/key ( loc )
###### print( series1.loc["c"])
#104
##### seaching value using index/key ( iloc )
###### series1.loc["c"]=200
print( series1.iloc[2])
#### DataFrames
##### Defining
###### data = { "Name": ["spongebob", "Patrick", "squidward"],
"Age": [30, 35, 50]
}
df = pd.DataFrame(data)
print(df)
#         Name  Age
# 0  spongebob   30
# 1    Patrick   35
# 2  squidward   50
##### Changing Index
###### df = pd.DataFrame(data, index=["Employee 1", "Employee 2", "Employee 3"])
print(df)
##### Shape
###### print(df.shape)
# (3, 2)
##### First n rows ( head() )
###### print(df.head())
#                  Name  Age
# Employee 1  spongebob   30
# Employee 2    Patrick   35
# Employee 3  squidward   50
##### Specific Element
###### print(df['Age']["Employee 1"])
# 30
##### seaching value using index/key ( iloc )
###### print(df.iloc[0])
# Name    spongebob
# Age            30
# Name: Employee 1, dtype: object
print(df.iloc[:, 0])
# Employee 1    spongebob
# Employee 2      Patrick
# Employee 3    squidward
# Name: Name, dtype: str
##### Set a Specific Column to be the Index of the DataFrame
###### df = df.set_index("Age")
print(df)
#Age   Name
#30   spongebob
#35     Patrick
#50   squidwarddf = df.set_index("Age")
##### Conditional statements
###### print(df.Name == "spongebob")
# Employee 1     True
# Employee 2    False
# Employee 3    False
# Name: Name, dtype: bool
print(df.loc[df.Name == "spongebob"])
#                  Name  Age
# Employee 1  spongebob   30
print(df.loc[(df.Name == "spongebob") & (df.Age >= 25)])
#                  Name  Age
# Employee 1  spongebob   30
##### isin()
###### # isin() - checking if values exist in a list
print(df.loc[df.Name.isin(["spongebob", "Patrick"])])
#                  Name  Age
# Employee 1  spongebob   30
# Employee 2    Patrick   35
##### Revering Values
###### df["Age"] = range(len(df), 0, -1)
##### Reading CSV File
###### pd.read_csv("file_location.csv")
##### Statistical Info
###### # Statistical info
print(df["Age"].describe())
# count      3.000000
# mean      38.333333
# std       10.408330
# min       30.000000
# 25%       32.500000
# 50%       35.000000
# 75%       42.500000
# max       50.000000
# Name: Age, dtype: float64
# Specifically print a statistical method's result
print(df["Age"].mean())
# 38.333333333333336
# Finding the index of the max value
print(df['Age'].idxmax())
# Employee 3
##### Unique
###### # Unique items in a column
print(df["Name"].unique())
# <StringArray>
# ['spongebob', 'Patrick', 'squidward']
# Length: 3, dtype: str
# To see unique values and how often they occur in the dataset
print(df["Name"].value_counts())
# Name
# spongebob    1
# Patrick      1
# squidward    1
# Name: count, dtype: int64
##### Lambda
> # map() returns a new Series where all the values have been transformed by your function.
> # apply() is the equivalent method if we want to transform a whole DataFrame by calling a custom method on each row/column.
###### remean = df['Age'].mean()
print(df['Age'].map(lambda p: p - remean))
# Employee 1    -8.333333
# Employee 2    -3.333333
# Employee 3    11.666667
# Name: Age, dtype: float64
##### apply()
###### remean = df['Age'].mean()
def remean_apply(row):
row['Age'] = row['Age'] - remean
return row
print(df.apply(remean_apply, axis='columns'))
#                        Name        Age
# Employee 1  spongebob  -8.333333
# Employee 2    Patrick  -3.333333
# Employee 3  squidward  11.666667
##### Sting Operation
###### # String operation
print(df['Name'] + " - " + df['Age'].astype(str))
# Employee 1    spongebob - 30
# Employee 2      Patrick - 35
# Employee 3    squidward - 50
# dtype: str
##### Replicating value_counts using groupby
###### print(df.groupby('Age')['Age'].count())
# Age
# 30    1
# 35    1
# 50    1
# Name: Age, dtype: int64
##### DataTypes
###### print(df.dtypes)
# Name      str
# Age     int64
# dtype: object
##### Type Conversion
###### df.Age = df.Age.astype('float64')
print(df)
#                  Name   Age
# Employee 1  spongebob  30.0
# Employee 2    Patrick  35.0
# Employee 3  squidward  50.0
##### Retrieve all NaN Values
###### # df.loc['Employee 1', 'Age'] = np.nan
print(df[pd.isnull(df.Age)])
##### Replacing Specific Values
###### # Replacing specific values
df.Name.replace("old", "new")
# Renaming column headings
print(df.rename(columns={'Age': 'Age in years'}))
#                  Name  Age in years
# Employee 1  spongebob          30.0
# Employee 2    Patrick          35.0
# Employee 3  squidward          50.0
# Renaming indexes
print(df.rename(index={'Employee 1': 'firstEntry', 'Employee 2': 'SecondEntry'}))
#                    Name   Age
# firstEntry    spongebob  30.0
# SecondEntry     Patrick  35.0
# Employee 3    squidward  50.0
# Renaming the axis titles
print(df.rename_axis("Info", axis='rows').rename_axis("Sr no.", axis='columns'))
# Sr no.            Name   Age
# Info
# Employee 1  spongebob  30.0
# Employee 2    Patrick  35.0
# Employee 3  squidward  50.0
##### Concat
###### # Concat (Combines different DataFrames vertically or horizontally)
pd.concat([df1, df2])
##### Merge
###### # Join / Merge (Combines DataFrames side-by-side based on a common column)
pd.merge(df1, df2, on='common_column_name', how='inner')
##### Deleteing MIssing Values
###### # Dropping missing values
df = df.dropna(axis=0)
##### Choosing Features
###### # Choosing features (typically for Machine Learning)
df_features = ['Age']
X = df[df_features]
### Matplotlib
### ML
#### Imports
##### from sklearn.metrics import confusion_matriximport seaborn as sns
cm = confusion_matrix(y_test, y_pred)sns.heatmap(cm, annot=True, fmt='d')import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from xgboost import XGBRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matriximport
#### Loading the Model
##### melbourne_file_path = '../input/melbourne-housing-snapshot/melb_data.csv'
# Loading a dataframe
melbourne_data = pd.read_csv(melbourne_file_path)
#### Single Tree Model
##### melbourne_model = DecisionTreeRegressor(random_state=1)
# Fit model
melbourne_model.fit(X, y)
#### Train/Test Split
##### X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2 , random_state=42)
#### Standard Scalar
##### scaler = StandardScaler()X_train_p= scaler.fit_transform(X_train)X_test_p = scaler.transform(X_test)
#### Overfitting VS underfitting
##### #function to get MAE of various models
def get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y):
model = DecisionTreeRegressor(max_leaf_nodes=max_leaf_nodes, random_state=0)
model.fit(train_X, train_y)
preds_val = model.predict(val_X)
mae = mean_absolute_error(val_y, preds_val)
return mae
# Compare MAE with differing values of max leaf mode , 5= high MAE = underfitting , 5000= high MAE = overfitting , 500= perfect model
for max_leaf_nodes in [5, 50, 500, 5000]:
my_mae = get_mae(max_leaf_nodes, train_X, val_X, train_y, val_y)
print("Max leaf nodes: %d  \t\t Mean Absolute Error:  %d" % (max_leaf_nodes, my_mae))
#### Random Forest
##### forest_model = RandomForestRegressor(random_state=1)
forest_model.fit(train_X, train_y)
#### Missing values
##### # Print columns with missing values
#series of all columns with count of missing values
missing_val_count_by_column = (X_train.isnull().sum())
#using the series to find columns with atleast1 missng values
print(missing_val_count_by_column[missing_val_count_by_column > 0])
#list of column with atleast 1 missng values
cols_with_missing = [col for col in X_train.columns if X_train[col].isnull().any()]
##### Drop
###### reduced_X_train = X_train.drop(cols_with_missing, axis=1)
reduced_X_valid = X_valid.drop(cols_with_missing, axis=1)
##### Impute
###### my_imputer = SimpleImputer() imputed_X_train = pd.DataFrame(my_imputer.fit_transform(X_train)) imputed_X_valid = pd.DataFrame(my_imputer.transform(X_valid)) imputed_X_train.columns = X_train.columns imputed_X_valid.columns = X_valid.columns
##### Extended Impute
###### X_train_plus = X_train.copy()
X_valid_plus = X_valid.copy()
for col in cols_with_missing:
X_train_plus[col + '_was_missing'] = X_train_plus[col].isnull()
X_valid_plus[col + '_was_missing'] = X_valid_plus[col].isnull()
my_imputer = SimpleImputer()
imputed_X_train = pd.DataFrame(my_imputer.fit_transform(X_train_plus))
imputed_X_valid = pd.DataFrame(my_imputer.transform(X_valid_plus))
imputed_X_train.columns = X_train_plus.columns
imputed_X_valid.columns = X_valid_plus.columns
##### Pipelines and columns tranformer
###### # ColumnTransformer class to bundle together different preprocessing steps
# Preprocessing for numerical data
numerical_transformer = SimpleImputer(strategy='constant')
df[['your_column_name']] = numerical_transformer.fit_transform(df[['your_column_name']])
# Preprocessing for categorical data
categorical_transformer = Pipeline(steps=[
('imputer', SimpleImputer(strategy='most_frequent')),
('onehot', OneHotEncoder(handle_unknown='ignore'))
])
df[['your_column_name']] = categorical_transformer.fit_transform(df[['your_column_name']])
# Bundle preprocessing for numerical and categorical data
# (Note: numerical_cols and categorical_cols need to be defined in your script)
preprocessor = ColumnTransformer(
transformers=[
('num', numerical_transformer, numerical_cols),
('cat', categorical_transformer, categorical_cols)
])
# Define the model
model = RandomForestRegressor(n_estimators=100, random_state=0)
# Bundle preprocessing and modeling code in a pipeline
my_pipeline = Pipeline(steps=[
('preprocessor', preprocessor),
('model', model)
])
##### Cross Validation
###### # Multiply by -1 since sklearn calculates negative MAE
scores = -1 * cross_val_score(my_pipeline, X,y,cv=5,scoring='neg_mean_absolute_error')
print("MAE scores:\n", scores)
##### Gradient Boosting
###### my_model = XGBRegressor(n_estimators=1000, learning_rate=0.05, n_jobs=4)
my_model.fit(X_train, y_train,
early_stopping_rounds=5,
eval_set=[(X_valid, y_valid)],
verbose=False)
##### Data leakage
###### # There are two main types of leakage: target leakage and train-test contamination.
#
# Target leakage:
# Occurs when your predictors include data that will not be available at the time you make predictions.
# To prevent this type of data leakage, any variable updated (or created) after the target value is realized should be excluded.
#
# Train-Test Contamination:
# A different type of leak occurs when you aren't careful to distinguish training data from validation data.
#### extractind column with specific datatypes from a dataframe
##### numeric_cols = X_train.select_dtypes(include=['int64','float64']).columns.tolist()
#### Confusion Matrics
##### y_pred = np.argmax(model.predict(X_test_p), axis=1)
from sklearn.metrics import confusion_matrix
import seaborn as sns
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d')
#### plotting
##### history=Trained_model.history
import matplotlib.pyplot as plt
plt.plot( history['loss'] , label='train')
plt.plot( history['val_loss'] , label='validation')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.show()
## Fundamentals of Deep learning
### ML VS DL
#### local:img-1794833678610-7d3d41a84d636403
### DL defination
#### Deep learning is a specialized subfield of machine learning and artificial intelligence (AI) utilizing deep artificial neural networks (ANNs) containing multiple hidden layers to automatically extract high-level feature representations from unstructured data.
### Limitations of ML and Why DL
#### Harder problems need complex decision boundaries and special handling for images, audio, text and 3D data.
SVM, NB, LR and ensembles are “not enough” for these problems.
Classical ML works on small data. As you feed it more data, it doesn’t improve.
It needs manual feature extraction and data preprocessing by humans.
### Advantages of DL
#### Learns features automatically.
Handles unstructured data.
Learns hierarchical features.
High accuracy on complex tasks.
Scales with big data and compute.
### challenges of DL
#### Data availability: it needs a lot of varied data, or it won’t generalize to unseen data.
Model complexity: design is trial and error. Too simple underfits, too complex overfits.
Lacks global generalization: with so many parameters, it is very hard to get the test error down to zero.
Can’t multitask: a cat/dog model can’t classify men/women, and reasoning is beyond it.
Hardware dependence: it is computationally expensive and needs GPUs or TPUs, not a normal CPU.
### Neural Network
#### Perceptron
##### local:img-1794824970372-8ea0a05322772eb2
##### single layer perceptron
###### It models one neuron: n inputs, a weighted sum, then an output. It is used for linear or binary classification.
Equation: ŷ = Wᵀx + b. Example: fish width, height and lightness give salmon (1) or shrimp (−1).
Limitation: one neuron “hardly makes a dent” in complex problems, so it can only draw a linear boundary.
##### Multilayer perceptron
###### A hierarchical mesh of neurons that learns a more sophisticated decision boundary.
It has input, hidden (all the calculation with weights, biases and data) and output layers.
Uses: stock prediction, image classification, spam detection, sentiment analysis and data compression.
Adding many hidden layers causes vanishing gradients and overfitting.
#### Layers
##### Input Layers
###### It's the entry point for raw data.  the number of nodes exactly matches the number of features in your dataset.
##### Hiddeen Layers
##### Output Layers
###### The final layer that produces the model's prediction is decided on the basis of task :-
1) Regression (Predicting a value): A single node with a linear (or no) activation function
2) Binary Classification (Yes/No): A single node using a Sigmoid activation function to output a probability between 0 and 1.
3) Multi-class Classification: Multiple nodes (one for each class) using a SoftMax activation function to output a probability distribution across all possible categories.
#### Weights and bias
##### each connection from one perceptron to another has some kind of weight showing how closely related the 2 perceptron's are to each other
Weights control the slope (orientation) of the decision line and how strongly each input counts. Bias shifts the line so it need not pass through the origin
##### local:img-1794825054263-62c0e666c146e05f
#### Types
##### Shallow NN
###### Neural network with 1 or less hidden layers
##### Deep NN
###### Neural network with 2 or more hidden layers
#### Types according to Functions
##### ANN
##### CNN
###### The Convolutional Neural Networks or CNNs are primarily used for tasks related to computer vision or image processing.
##### RNN
###### The Recurrent Neural Networks or RNN are primarily used to model sequential data, such as text, audio, or any type of data that represents sequence or time.
##### GAN
###### This type of network essentially learns the structure of the data, and patterns
in a way that it can be used to generate new examples, similar to that of the original dataset.
##### Transformers
###### A newer class of model, used mostly for sequential data like NLP. replacing RNN and CNN
### Trainng
#### Trainng FLow
##### >Input.
>Forward propagation (w·x + b, then activation).
>Output.
>Error calculation using the loss function.
>Backpropagation updates the weights and biases.
#### Parameter control
##### Leraning rate
###### local:img-1794833827718-380ec9a27e6baacf
###### >The learning rate is the size of the change made to the weights during backprop.
>It is a hyperparameter set with the optimizer, for example Adam(learning_rate=0.001). The default is 0.001 (1e-3).
>Too small means very slow training. Too high means it overshoots the minimum and may diverge.
>To find it: learning rate range test, grid search, random search. A scheduler can also adjust it during training.
###### Constant LR
###### Time decay
###### Step based decay
###### Exponential decay
###### Custom LR
#### loops
##### Batch
> A distinct subset of the training dataset processed by a neural network during a single operational cycle which is forward propagation , loss , backward propagation and parameter update.
###### Forward propogation
- z = W·x + b, then a = f(z).
###### LOSS Calculation
- MAE
- mean of |y − ŷ|, less sensitive to outliers than MSE
- MSE
- local:img-1794828558753-d14b2fb3647ab722
- Binary cross Entropy
- Cross-entropy is a sort of measure for the distance from one probability distribution to another.
- local:img-1794828682403-5c6796e7e2ca19a2
- Categorical Cross Entropy
- local:img-1794828698165-5d687ab5e3f5ab8c
###### Back propogation
- local:img-1794828970095-b59583863d822565
###### Parameter Update
- Complexity of the model depends on no. of parameters and it's training , which is controlled by the change in weights and bias combined called as parameters .
- Issues
- VAnishing gradient
- ● As we add more and more hidden layers, backpropagation becomes less and less useful in passing information to the lower layers.
● In effect, as information is passed back, the gradients begin to vanish and become small relative to the weights of the networks.
##### Epoch
###### One complete pass of the entire dataset through the neural network
### Gradient Descent
#### local:img-1794828078571-b6f4349fd91831b5
#### Defination
#### Types
##### Batch GD
##### Stochastic GD
##### Mini-Batch GD
##### Online GD
#### Optimization Algorithms
##### SGD (Vanilla)
##### Momentum
##### RMSProp
##### Adam
### Overfitting
#### ● Overfitting describes the phenomenon of fitting the training data too closely, maybe with hypotheses that are too complex.
#### Training Curve Diagnosis
#### Regularization
##### L2 ( Ridge )
##### L1 ( Lasso )
##### Batch Normalization
##### Dropout
###### # We randomly drop out some fraction of a layer's input units every step of training.
# Making it much harder for the network to learn those spurious patterns in the training data.
# Instead, it has to search for broad, general patterns, whose weight patterns tend to be more robust.
##### Early Stopping
##### Data Augmentation
##### Simplify The Model
##### local:img-1794828351716-68c1f7a7032ae58f
### Applications
#### Computer Vision
#### Natural language Processing ( NLP )
#### Speech Recognition
#### Healthcare
#### Autonomous Vehicles
#### Recommendation Systems
### Tensorflow
#### >Developed by the Google Brain Team. It is an open-source library for numerical computation, used in research and production.
>Data is held in tensors: multidimensional arrays, a generalization of vectors and matrices.
>It works as a data flow graph: nodes are math operations and edges are tensors. A program has two steps, build the graph and execute the graph.
>Computing can be spread across CPUs and GPUs.
### Keras
#### >A high-level neural network API written in Python, by François Chollet.
>Easy and fast prototyping: user-friendly, modular and extensible. It gives clear feedback on errors.
>It runs on top of TensorFlow, Theano or CNTK, and works on CPU and GPU.
>Why Keras: simple to start, supports CNN, RNN and combinations, and is deep enough for serious models.
### CODES
#### Import
##### import pandas as pd
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import EarlyStopping
#### Weights ,bias of a model
##### w, b = model.weights
print("Weights\n{}\n\nBias\n{}".format(w, b))
#### Model HIdden layer
##### model = keras.Sequential([
# the hidden ReLU layers
layers.Dense(units=4, activation='relu', input_shape=[2]),
layers.Dropout(rate=0.3)
layers.Dense(units=3, activation='relu'),
# the linear output layer
layers.Dense(units=1),
])
#### compile
##### model.compile(
optimizer=optimizer=keras.optimizers.Adam(learning_rate=lr),
loss='mae',
metrics=['binary_accuracy']
)
#### fit
##### model.fit(X_train_p , y_train , epochs=100 , batch_size=16 , callbacks=[EarlyStopping(patience=10 , restore_best_weights=True)] ,validation_split=0.2 )
#### scaling 0 to 1
##### from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
train_scaled = scaler.fit_transform(train_df[['meantemp']])
test_scaled = scaler.transform(test_df[['meantemp']])
#### Predict
##### print("First 5 houses features:\n", X.head())
print("The predictions are:\n", melbourne_model.predict(X.head()))
#### MAE Value
##### predicted_home_prices = melbourne_model.predict(X)
print("In-Sample MAE:", mean_absolute_error(y, predicted_home_prices))
#### Manual Epoch
##### with tf.GradientTape() as tape:
preds = model(X)
# forward propagation
loss = tf.reduce_mean(            tf.keras.losses.sparse_categorical_crossentropy(y, preds))
# loss calculation
grads=tape.gradient(loss,model.trainable_variables)
# backpropagation    model.optimizer.apply_gradients(zip(grads, model.trainable_variables))
# parameter update
## Activation functions
### What is an activation function?
#### Decides whether a neuron should be activated, i.e. whether its input matters for the prediction, using simple mathematical operations.
### Categories
#### Binary Step Function
##### Depends on a threshold that decides whether the neuron fires.
f(x) = 0 for x < 0, and 1 for x ≥ 0.
Input to it: ŷ = x1·w1 + x2·w2 + b.
#### Linear Activation function
##### Output isn’t restricted to any range: −∞ to +∞.
f(x) = x.
Used in the output layer for regression.
#### Non-linear Activation Functions
##### Most widely used. Helps the model generalize and adapt to any kind of data and differentiate between outputs.
##### Sigmoid
###### It is a differentiable activation function means it can be used for gradient Descent. ( good for probabilities)
Suffers form Vanishing Gradient
Output Range ➖ ( 0 1 )
f(x)=1/(1+e^(-x))
###### local:img-1794841402947-a5a04d5068b36154
##### Tanh
###### It is Zero centered Means can be used for Gradient Descent , Used mainly in RNNs
Output range ➖( -1    1 )
f(x)={e^x-e^(-x)}/{e^x+e^(-x)}
###### local:img-1794841417947-39d685cf9d5f92c5
##### Relu
###### It’s main advantage is that it avoids and rectifies vanishing gradient problem and less computationally expensive than tanh and sigmoid.
f(x)=max(0,x)
###### Derivative: 1 for x > 0, 0 for x < 0. Piecewise linear. Con: dying ReLU (inactive for negative inputs); not zero-centered
###### local:img-1794841433169-03393cf2b273e9b8
###### local:img-1794841437800-5dae8a859c19c0df
##### Leaky ReLU
###### f(x) = max(0.01x, x). Attempt to fix the dying ReLU problem; the "leak" (α ≈ 0.01) gives negative inputs a small slope.
###### pros
- No dead ReLU problem. Parametric ReLU: f(x) = max(αx, x), where α is learned by backpropagation
###### cons
- Not proven to be always better than ReLU.
##### ELU
###### f(x) = x for x ≥ 0; α(eˣ − 1) for x < 0. Same as ReLU for non-negative inputs, but for negative inputs it smooths slowly towards −α instead of cutting off sharply
###### Pros
- Strong alternative to ReLU. Can produce negative outputs
###### cons
- For x > 0 it can blow up the activation (range [0, ∞))
##### Softmax
###### It is used when output is categorical
it calculates the probability of target class over all target classes
softmax(z_i)={exp(z_i)}/{\sum_j exp(z_j)}
###### local:img-1794841668296-b41c286d4d3fba9c
###### local:img-1794841442336-840ad28b58f946a9
###### pros
- mimics one-hot labels; exponential avoids the information loss of absolute values.
###### cons
- Not for multi-label (use sigmoid) or regression.
##### Swish
###### Inspired by sigmoid gating in LSTMs and highway networks. Uses the same value for gating (self-gating)
###### Pros
- No dying ReLU. Accuracy increase over ReLU.
###### cons
- Slightly more computationally expensive. More issues may appear over time.
###### local:img-1794841448935-e15f3e359950da63
##### Maxout
###### Generalization of ReLU and LeakyReLU ,it’s a learnable activation function.
max(w₁ᵀx + b₁, w₂ᵀx + b₂)
###### cons
- Doubles the number of parameters per neuron, so more parameters to train.
##### Softplus
###### smoother version of ReLU
f(x)=ln(1+exp x) , unilateral suppression like ReLU. Range (0, +∞).
###### local:img-1794841458836-18417ab692a8e79c
##### local:img-1794841463406-d9103aea2ba6d8fc
### Choosing Activation Functions
#### local:img-1794841469170-d35f1d99659860d9
## Recurrent Neural Network (RNN) and Long Short-Term Memory (LSTM)
### RNN
#### Why RNN? (FFNN vs RNN)
##### FFNN: fixed input/output size, no order, no memory, no parameter sharing
##### Order matters: "Kelly worked at Google" vs "Google worked at Kelly"
##### 4 design criteria: variable length, long-term dependencies, order, shared parameters
#### Definition
##### Handles sequential data using a hidden state (memory) carried from previous time steps
#### RNN Equations (one convention: W_xh, W_hh, W_hy, with biases)
##### local:img-1794851803238-580a999d9b5b33da
##### hₜ = tanh(W_xh·xₜ + W_hh·hₜ₋₁ + b_h)
##### ŷₜ = softmax(W_hy·hₜ + b_y)
##### The image writes W_hx and W_yh. Same thing, different naming.
#### RNN Representation
##### local:img-1794851808745-b8c2ae299c4865ca
##### The image shows only the compact (rolled) form
##### Unfolded form: same W_xh, W_hh, W_hy at every step
##### Total loss L = Σ Lₜ
#### Types of RNN
##### One to One: binary classification
##### One to Many: image captioning, music/text generation
##### Many to One: sentiment classification
##### Many to Many, same length: POS tagging, NER
##### Many to Many, different length (encoder-decoder): translation
#### Activation Functions
##### Tanh: most common for the hidden state
##### ReLU: faster but can be unstable
##### Sigmoid: gates
##### Softmax: multi-class output
#### BPTT (Backpropagation Through Time)
##### Forward pass over all steps, loss at each step
##### Backward pass through time, summing gradients over steps
##### Gradient wrt h₀ has many repeated W_hh factors
##### Truncated BPTT: backprop over a fixed window
#### Vanishing Gradient
##### Factors < 1 multiply together, so the gradient shrinks and long-term info is lost
##### Example: "I grew up in France… I speak fluent ___"
##### Fixes: ReLU, identity init of W_hh with zero bias, gated cells (LSTM/GRU)
#### Exploding Gradient
##### Factors > 1 multiply together, so training is unstable
##### Fix: gradient clipping
#### Advantages
##### Handles variable-length input, shares parameters, remembers earlier steps
#### Drawbacks
##### Vanishing/exploding gradients
##### Slow, sequential training (no parallelism)
##### Weak long-term memory
##### Can't use future inputs (leads to BiRNN)
#### Applications
##### Text, speech, time series, translation, sentiment analysis
#### Bidirectional RNN (BiRNN)
##### Forward and backward hidden states, concatenated
##### yₜ = g(W[h→ₜ ; h←ₜ] + b)
##### Uses: NER, speech, text understanding
##### Limitation: needs the full sequence, so no real-time use
##### Usually built with LSTM cells (BiLSTM)
#### Encoder-Decoder (Seq2Seq)
##### Encoder compresses input into a context vector
##### Decoder generates the output sequence
##### Bottleneck, which led to attention and then Transformers
### LSTM
#### local:img-1794851820638-410cf3771e7d50c6
#### Corrections to the image
##### Cell state is the memory, not a fourth gate. There are only 3 gates.
##### * in the handwriting means ⊙ (element-wise multiply)
##### iₜ = σ(W_i·[hₜ₋₁, xₜ] + b_i)
##### C̃ₜ = tanh(W_C·[hₜ₋₁, xₜ] + b_C)
#### Definition
##### Gated RNN that mitigates vanishing gradients and learns long-term dependencies
##### Exploding gradients can still occur, so use gradient clipping
#### Two states
##### Cell state Cₜ: long-term memory
##### Hidden state hₜ: working/output state
#### Three gates (all sigmoid, output 0–1)
##### Forget gate: "keep" gate
##### Input gate: "write" gate
##### Output gate: "read" gate
#### Sigmoid vs tanh
##### Sigmoid acts as the gate
##### Tanh shapes values (candidate C̃ₜ and squashing Cₜ)
#### Equations (⊙ = element-wise multiply)
##### fₜ = σ(W_f·[hₜ₋₁, xₜ] + b_f)
##### iₜ = σ(W_i·[hₜ₋₁, xₜ] + b_i)
##### C̃ₜ = tanh(W_C·[hₜ₋₁, xₜ] + b_C)
##### Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ
##### oₜ = σ(W_o·[hₜ₋₁, xₜ] + b_o)
##### hₜ = oₜ ⊙ tanh(Cₜ)
#### Four steps
##### Forget → Store → Update → Output
#### Why it works
##### Additive cell-state update gives a more direct path for gradient flow
#### Parameter count
##### 4 × [(m + n)·n + n], m = input size, n = units
##### LSTM(50, input_shape=(30,1)): 4 × (51·50 + 50) = 10,400
#### Advantages
##### Learns long-term dependencies, mitigates vanishing gradients
#### Disadvantages
##### More parameters, slower than GRU, can't parallelize over time
#### Applications
##### Language modelling, translation, speech recognition, time-series forecasting
#### CODES
##### layers.SimpleRNN(50)
##### layers.LSTM(50, input_shape=(30,1))
##### layers.GRU(50)
##### layers.Bidirectional(layers.LSTM(50))
##### return_sequences=True for many-to-many or stacked layers
##### layers.Embedding(vocab_size, dim) for text
### GRU
#### No separate cell state, only hₜ
#### 2 gates: update (z) and reset (r)
#### zₜ = σ(W_z·[hₜ₋₁, xₜ])
#### rₜ = σ(W_r·[hₜ₋₁, xₜ])
#### h̃ₜ = tanh(W·[rₜ ⊙ hₜ₋₁, xₜ])
#### hₜ = (1 − zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ
##### (zₜ vs 1−zₜ placement varies by textbook)
#### Reset gate: how much of the previous state feeds the candidate
#### 3 weight sets vs 4 in LSTM, so fewer parameters and faster
### Comparison: RNN vs LSTM vs GRU vs BiRNN
#### local:img-1794851794387-2cfea42f38327023
#### Corrections to the table
##### BiRNN "long-term dependencies: Yes" depends on the cell. A plain-RNN BiRNN still vanishes, so use BiLSTM.
##### BiRNN cost is about 2× its underlying cell
##### BiRNN can't be used for real-time work
##### Cost per step: RNN < GRU < LSTM
#### Long-term dependencies: RNN poor | LSTM good | GRU good | BiRNN depends on cell used
#### States: RNN 1 (h) | LSTM 2 (h, C) | GRU 1 (h) | BiRNN 2 directions
#### Gates: RNN 0 | LSTM 3 | GRU 2 | BiRNN depends on cell
#### Real-time use: RNN yes | LSTM yes | GRU yes | BiRNN no
## Convolutional Neural Network ( CNN )
### Why CNN?
#### Limitations of ANN
##### Location-shift Sensitivity
##### Computationally Expensive
#### Convolution
##### Convolution is a Mathematical operation where two functions are blended together to produce a third function . It actually measures how much one function overlaps with another .
In Deep Learning Small Matrices and Big Matrices roll together to form a single new value, which helps the computer detect patterns like edges, curves, or textures.
### Image Processing
#### Resizing
#### Normalization
#### Data Augmentation
### CNN architecture
#### Filters / Kernels
#### Stride
##### How many cells the filter is moved
#### Padding
##### It allows us to use a CONV layer without necessarily shrinking the height and width of the volumes.
It helps us keep more of the information at the border of an image.
#### Output Dimension Formula
##### n=height of current layer
f=Spatial size of filter
p=padding
s=stride
l=the current layer you are calculating
l -1=the previous layer.
##### local:img-1794852990560-e3044e7bb77f4ff8
#### Convolution on Volume
##### local:img-1794852997419-f6383b2b79ba6afe
#### Multiple Filters
##### local:img-1794853003167-2d2d40484e3f86ae
#### 1×1 Convolution
##### local:img-1794853010605-a506b3b3d760cb94
#### Pooling Layers
##### Reducing the size of the representations to make some of the features it detects a bit more robust.
it has hyper-parameters:
but it doesn’t have parameter; there’s nothing for gradient descent to learn
##### Max polling
##### AVG Polling
##### local:img-1794853019004-a8ec7e3b5953e4a6
##### Hyper-Parameters
###### Size
###### Stride
###### Type
#### Batch Normalization layer
##### To normalize inputs between layers. could be used before or after the activation function layer
#### Dropout Layer
##### Drop out a fraction of neurons from a layer.
#### Flatten Layer
##### To convert multi-dimensional convolutional blocks into 1-D vectors
#### Fully Connected Layer
##### To process the flattened image data and carry out the classification.
### Pre-Trained Models
#### AlexNet
#### VGGNet
#### ResNet
#### Inception v3
#### DesnseNet
#### EffecientNet
#### DarkNet
#### TFLite
#### local:img-1794853045329-70266faf96ddcf58