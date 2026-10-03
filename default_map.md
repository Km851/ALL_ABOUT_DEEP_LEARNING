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
#### local:img-1790047137573-beea8fe484369cd1
### DL defination
#### Deep learning is a specialized subfield of machine learning and artificial intelligence (AI) utilizing deep artificial neural networks (ANNs) containing multiple hidden layers to automatically extract high-level feature representations from unstructured data.
### Neural Network
#### Perceptron
##### local:img-1790047931893-ee798507668c8fa2
#### Layers
##### Input Layers
###### It's the entry point for raw data.  the number of nodes exactly matches the number of features in your dataset.
##### Hiddeen Layers
##### Output Layers
###### The final layer that produces the model's prediction
activation function for hidden layer just before the output layer is decided on the basis of task :-
1) Regression (Predicting a value): A single node with a linear (or no) activation function
2) Binary Classification (Yes/No): A single node using a Sigmoid activation function to output a probability between 0 and 1.
3) Multi-class Classification: Multiple nodes (one for each class) using a SoftMax activation function to output a probability distribution across all possible categories.
#### Weights and bias
##### each connection from one perceptron to another has some kind of weight showing how closely related the 2 perceptron's are to each other
Weights are used to shift the line , Bias is used to determine the slope
##### local:img-1790052092700-b0547e27f32e135b
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
### Trainng
#### Parameter control
##### Leraning rate
###### local:img-1790091386536-480f79548dd5341e
###### Constant LR
###### Time decay
###### Step based decay
###### Exponential decay
###### Custom LR
#### loops
##### Batch

> A distinct subset of the training dataset processed by a neural network during a single operational cycle which is forward propagation , loss , backward propagation and parameter update.
###### Imports
###### Defining an Input and Output Layer
###### Scaling the Data
###### Forward propogation
###### Loss calculation
- MAE
- MSE
- local:img-1790091785595-3923fa15b7795176
- Binary Cross Entropy
- # Cross-entropy is a sort of measure for the distance from one probability distribution to another.
# Activation function: the sigmoid activation.
- local:img-1790091876784-50a40517875c2f4d
- Categorical Cross Entropy
- local:img-1790091915519-dcd9edfa34177b47
###### Back propogation
- local:img-1790092088253-51c9975a8b3d5f10
###### Parameter update
- Complexity of the model depends on no. of parameters and it's training , which is controlled by the change in weights and bias combined called as parameters .
- Issues
- Vanishing gradient
- ● As we add more and more hidden layers, backpropagation becomes less and less useful in passing information to the lower layers.
● In effect, as information is passed back, the gradients begin to vanish and become small relative to the weights of the networks.
###### Plot Curve
##### Epoch
###### One complete pass of the entire dataset through the neural network
### Gradient Descent
#### local:img-1790092956486-65461ba74df8fe10
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
● In such a case, your learner ends up fitting the training data really well, but will perform much, much more poorly on real examples.



When a model is too eagerly learning noise, the validation loss may start to increase during training.
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
##### local:img-1790093002894-dfa710694bff5724
### Applications
#### Computer Vision
#### Natural language Processing ( NLP )
#### Speech Recognition
#### Healthcare
#### Autonomous Vehicles
#### Recommendation Systems
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
### Categories
#### Binary Step Function
#### Linear Step Function
#### Non-linear Activation Functions
##### Sigmoid
###### It is a differentiable activation function means it can be used for gradient Descent. ( good for probabilities)
Suffers form Vanishing Gradient
Output Range ➖ Binary - 0 or 1
f(x)=1/(1+e^(-x))
###### local:img-1790393103817-225faf5ce9b0aab0
##### Tanh
###### It is Zero centered Means can be used for Gradient Descent
Output range ➖[ -1    1 ]
f(x)={e^x-e^(-x)}/{e^x+e^(-x)}
###### local:img-1790393223254-d926b16f9fe22215
##### Relu
###### It’s main advantage is that it avoids and rectifies vanishing gradient problem and less computationally expensive than tanh and sigmoid.
f(x)=max(0,x)
###### local:img-1790393277278-e7987caa9b7aa84b
###### local:img-1790393283701-dc39cc888cd156fc
##### Softmax
###### It is used when output is categorical
it calculates the possibility of target class over all target classes
softmax(z_i)={exp(z_i)}/{\sum_j exp(z_j)}
###### local:img-1790393441404-d3b743f1fdc7d1fe
##### Swish
###### Inspired by Sigmoid Function , Used for Gating in LSTM and Highway Networks
###### local:img-1790393540176-297957c0cc932c72
##### Maxout
###### Generalization of ReLU and LeakyReLU ,it’s a learnable activation function.
max(w^T_1+b_1 , w^t_2+b_2)
##### Softplus
###### smother version of ReLU
f(x)=ln(1+exp x)
###### local:img-1790393637806-8a5e3d373e266f7f
##### local:img-1790393472497-d23c9b03e3593205
### Choosing Activation Functions
#### local:img-1790393499824-a742c78b4f96aa8b
## Recureent Nural Network ( RNN ) and Long Short-Tem Memory (LSTM)
### RNN
#### Designed to handle sequential data by maintaining a hidden state ( memory) that captures information from previous time steps.
#### RNN Equations
##### local:img-1790449747108-08f92c0bbbb06956
#### RNN Representation
##### local:img-1790449795875-e6be65195a5f0e9e
#### Types of RNN Outputs
##### One to One
###### Used for Binary Classification
##### Many to One
###### Used for Sentiment Classification
##### One to Many
###### Image Captioning
##### Many to Many ( Encoder - Decoder )
###### Language Translation
##### Many to Many ( Synchronized )
###### POS Tagging
#### Activation Functions
##### Tanh
###### Most Common in RNN
##### ReLU
###### Fatser but can be less stable
##### Sigmoid
###### Usefull for gate and outputs
#### Vanishing Gradient
##### Gradients Become too small as tehy flow back ( model forgets long term info)
#### Exploding Gradients
##### Gradients Grow too large as they flow back ( model becomes unstable )
#### Drawbacks of RNN
##### RNN suffers from memory loss
##### Suffers from Vanishing Gradeint
##### Difficult Training
##### BPTT
### LSTM
#### A type of RNN model designed to prevent the output of a neural network form either exploding or decaying
#### Activation functions
##### Tanh
##### Sigmoid
#### local:img-1790451390375-20b386de33e7a7ac
#### CODES
##### sequential
###### model = keras.Sequential([    layers.LSTM(50, input_shape=(30, 1)),    layers.Dense(1)])
### local:img-1790450800882-2943872cde5c49e9
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
##### local:img-1790393948104-c1abb04588ced3b4
#### Convolution on Volume
##### local:img-1790394030823-1629d651e0087884
#### Multiple Filters
##### local:img-1790394049896-71908f1a88fc13d7
#### 1×1 Convolution
##### local:img-1790394069055-3ca96543aa67f113
#### Pooling Layers
##### Reducing the size of the representations to make some of the features it detects a bit more robust.

it has hyper-parameters:

but it doesn’t have parameter; there’s nothing for gradient descent to learn
##### Max polling
##### AVG Polling
##### local:img-1790394202090-5a7d876cac78ce3e
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
#### local:img-1790393809739-cdd8eb6f46f76b24