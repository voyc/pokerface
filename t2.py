import numpy as np
import matplotlib.pyplot as plt  

t = np.linspace(-10, 10, 100)  # create array as parameter t
x = t  #-1 + -1*t    # create vector x for parameter t
y = 2 + -1*t
y = 2 * (x**2)

plt.plot(x,y)
plt.show()
