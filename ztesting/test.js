// console.log("HELLO")

const regex = /^[a-z]+, (A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/i;

// const goodString = 'Bend, NY';
const goodString = 'Bend, ZZ';
// const badString = 'Band, zz';


if (goodString.match(regex)) {
    console.log("It works");
} else {
    console.log("NOPE")

}
// if (badString.match(regex)) {
//     console.log("It works 2");
// } else {
//     console.log("NOPE 2")
// }

// const regex = '/[a-z]{1}/i';

// const string = "A";

// console.log(string.match(regex));

// if (string.match(regex)) {
//     console.log("SUCCESS")
// }
