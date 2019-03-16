---
layout: post
mathjax: true
title: A Primer On Computational Geometry
---

There are many interesting problems and algorithms in the field of Computational Geometry. The aim of this post is not to be an overview of significant areas or a road map to learning the field, but rather a primer for the University of Ottawa Computer Science Games team for challenges involving Geometry problems. We will cover basic vectors, matrices and linear algebra as well as various novice and intermediate applications of Computational Geometry.

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
    \vdots \\
    x_n + y_n
\end{bmatrix}

$$

The dot product of two vectors is as follows :

$$

\vec{x} \cdot \vec{y} = \sum_{i=1}^N x_i \cdot y_i

$$

The angle between two vectors $ \vec{a} $ and $ \vec{b} $ can then be computed using the dot product :

$$

cos(\theta) = \frac{\vec{a} \cdot \vec{b}}{\lvert \vec{a} \rvert \cdot \lvert \vec{b} \rvert}

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

### Area of a triangle

There is an algorithm for computing the area of a triangle given only the coordinates of the vertices. This algorithm is known as [Heron's Formula](https://en.wikipedia.org/wiki/Heron%27s_formula). Given the three points $ \vec{a} $, $ \vec{b} $, and $ \vec{c} $, we can compute the area by first computing the side lengths $A$,$B$ and $C$

$$ A = \lvert \vec{a} - \vec{b} \rvert $$
$$ B = \lvert \vec{a} - \vec{c} \rvert $$
$$ C = \lvert \vec{b} - \vec{c} \rvert $$

Then the area is calculated by :

$$ S = \frac{A + B + C}{2} $$
$$ Area = \sqrt{S(S-A)(S-B)(S-C)} $$

### Convex Hull Algorithm in 2D

Given a set of random points, there is something defined as the [Convex Hull](https://en.wikipedia.org/wiki/Convex_hull). The convex hull is a polygon that encapsulates all the points given and does not have any edges that face inwards (i.e. concave). The [Gift Wrapping Algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm) to compute the convex hull is fairly simple :
1. Take the leftmost point of the point cloud (called $ l $) and create a new artificial with the same y position as $ l_1 $ but slightly more to the left. This new point will be denoted $ l_2 $.
2. Next iterate over all the points in the point cloud and for each point (denoted $ l_3 $), create two vectors
$$ \vec{a} = \begin{bmatrix}
    l_{2}.x - l_{1}.x \\
    l_{2}.y - l_{1}.y
    \end{bmatrix} $$
and
$$ \vec{b} = \begin{bmatrix}
    l_{3}.x - l_{2}.x \\
    l_{3}.y - l_{2}.y
    \end{bmatrix} $$
3. Choose the point $ l_3 $ which produces the smalles clockwise angle from $ \vec{a} $ to $ \vec{b} $.
4. Update $ l_1 $ to be the value of $ l_2 $ and $ l_2 $ to the value of $ l_3 $.
5. repeat steps 2 to 4 until the $ l_3 $ chosen is the same as the starting point.

<img src="{{ site.baseurl }}/images/gift_wrapping_algo_white.png" width="500px" height="300px">
Source : [Wikipedia, Gift Wrapping Algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm)

### Minimum Bounding Rectangle