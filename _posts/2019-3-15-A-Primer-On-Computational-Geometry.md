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
1. Take the leftmost point of the point cloud (the point is called $ p_1 $) and create a new artificial point with the same y position as $ p_1 $ but slightly more to the left. This new point will be denoted $ p_0 $. We will discard this point after the first iteration.
2. Next iterate over all the points in the point cloud and for each point (denoted $ p_2 $), create two vectors
$$ \vec{a} = \begin{bmatrix}
    p_{1}.x - p_{0}.x \\
    p_{1}.y - p_{0}.y
    \end{bmatrix} $$
and
$$ \vec{b} = \begin{bmatrix}
    p_{2}.x - p_{1}.x \\
    p_{2}.y - p_{1}.y
    \end{bmatrix} $$
3. Choose the point $ p_3 $ which produces the smalles clockwise angle from $ \vec{a} $ to $ \vec{b} $.
4. Update $ p_0 $ to be the value of $ p_1 $ and $ p_1 $ to the value of $ p_2 $.
5. repeat steps 2 to 4 until the $ p_2 $ chosen is the same as the starting point.

<img src="{{ site.baseurl }}/images/gift_wrapping_algo_white.png" width="500px" height="300px">
Source : [Wikipedia, Gift Wrapping Algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm)

### Calculating the Centroid of Convex Polygon

Given a convex polygon, we sometimes need to compute the centroid (or center of mass) of the polygon. While simply computing the average coordinates of all the vertices is easy, it does not actually give the center of mass as properly defined. The following algorithm can be implemented to calculate the centroid of any CONVEX polygon :

1. Compute the average x and y coordinates of all the vertices. We will use this centerpoint as the origin.
2. Next, calculate the angle of each vertex relative to the origin and order all the vertices by increasing angle, this will allow any two consecutive points in our vertex array to form a triangle with the center point.
3. The centroid of a triangle is actually computed by the coordinates of the 3 vertices.
4. The centroid of the polygon is then calculated by the average of the triangle centroids, weighted by the area of the triangle.

In the following section, relevant equations are defined. Let us have *N* points, with triangles formed by points *a*, *b* and *c*, each with *x* and *y* coordinates. *V* is the current vertex being examined in the relevant algorithm step.

$$ 

center point = \begin{bmatrix}
    \frac{\sum_{i=1}^N x_i}{N} \\
    \frac{\sum_{i=1}^N y_i}{N}
    \end{bmatrix}

$$

$$
	angle = tan^{-1} \left( \frac{V.y - center point.y}{V.x - center point.x} \right)
$$

$$

triangle \, centroid = \begin{bmatrix}
    \frac{a.x + b.x + c.x}{3} \\
    \frac{a.x + b.x + c.x}{3}
    \end{bmatrix}

$$

$$

polygon \, centroid = \frac{\sum_{i=1}^N \overrightarrow{centroid_i} \cdot area_i}{\sum_{i=1}^N area_i}

$$

### Minimum Bounding Rectangle Algorithm in 2D

Assuming we have a convex hull of some set of points, we often can't use this convex hull directly. A common procedure is then to calculate the minimum bounding rectangle of the given convex polygon. The algorithm for this is somewhat straightforward :

1. calculate the centerpoint of the polygon by the average of the x, y coordinates of the vertices
2. order all of the vertices clockwise around the centerpoint.
3. Iterate over each pair of adjacent points on the polygon $ \vec{a} $ and $ \vec{b} $
4. For each pair of points, calculate the vector $ \vec{u} = \vec{a} - \vec{b} $ as well as the perpendicular vector $$ \vec{v} = \begin{bmatrix}
    u.y \\
    -u.x
    \end{bmatrix} $$
5. Iterate over all the points in the polygon and calculate the projection of each point onto $ \vec{u} $ and $ \vec{v} $. This will give you the distance of that point along and perpendicular to the given edge. By taking the maximum and minimum projections, you can identify the bounding rectangle given the reference edge. the rectangle is defined by the two orientation vectors $ \vec{u} $ and $ \vec{v} $ as well as their extents along the respective axis.
6. Iterate over all the edges and select the resulting rectangle with the smallest area.

 

