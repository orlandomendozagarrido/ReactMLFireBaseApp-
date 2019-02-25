function findOdd(A) {
  for (let e = 0; e < A.length; e++) {
    if (A[e] <0) {
      A[e] *= -1
    }
    if (A[e] %2!==0) {
      return A[e]
    } 
  }
}