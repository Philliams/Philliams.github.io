---
layout: post
mathjax: true
title: A Primer On Computational Geometry
---

There are many interesting problems and algorithms in the field of Computational Geometry. The aim of this post however is not to be an overview of significant areas or a road map to learning the field, but rather a primer for the University of Ottawa Computer Science Games team for challenges involving Geometry problems. We will cover basic vectors, matrices and linear algebra as well as various novice and intermediate applications of Computational Geometry.

### Introduction to Vectors

A vector is a construct that denotes a quantity and a direction in *N* dimensions:

$$

\vec{x} = \begin{bmatrix}
    x_1 \\
    x_2 \\
    ... \\
    x_n
\end{bmatrix}

$$

The magnitude or length of a vector is denoted $ \lvert \vec{x} \rvert $ and calculated as :

$$

\lvert \vec{x} \rvert = \sqrt{\sum_{i=1}^N x_i^2}

$$

Two vectors can be added together as follows :

$$

\vec{x} + \vec{y} = \begin{bmatrix}
    x_1 + y_1 \\
    x_2 + y_2 \\
    ... \\
    x_n + y_n
\end{bmatrix}

$$

The dot product of two vectors is as follows :

$$

\vec{x} \cdot \vec{y} = \sum_{i=1}^N x_i \cdot y_i

$$

The angle between two vectors can then be computed using the dot product :

$$

cos(\theta) = \vec{a} \cdot \vec{b}

$$

The last operation that will be relevant is scalar projection. Scalar projection is a little strange, but you can imagine that the projection of a vector $ \vec{a} $ on another vector $ \vec{b} $ is the magnitude of the vector $ \vec{a} $ in the direction defined by $ \vec{b} $.

<img src="{{ site.baseurl }}/images/vector_projection_white.png" width="500px" height="300px">

Source : [Wikipedia, Vector Projection](https://en.wikipedia.org/wiki/Vector_projection)

The Scalar Projection is computed as :

$$

 \vec{a_b} = \frac{\vec{a} \cdot \vec{b}}{\lvert \vec{b} \rvert} 

$$

### Introduction to Matrices

Matrices are basically a 2D variant of Vectors in that they have both columns and rows :

$$
    M_{m \times n} = \begin{bmatrix}
    a_{1,1} & a_{1,2} & \cdots & a_{1,m} \\
    a_{2,1} & a_{2,2} & \cdots & a_{2,m} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{n,1} & a_{n,2} & \cdots & a_{n,m}
    \end{bmatrix}
$$

There aren't many operations on matrices that will be directly relevant to this primer, but the notation is good to know. For my operations on matrices check out the [Determinant](https://en.wikipedia.org/wiki/Determinant) and [Multiplaction](https://en.wikipedia.org/wiki/Matrix_multiplication) operations.