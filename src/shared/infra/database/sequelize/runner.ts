// async function runner(promises) {
//   for (let command of promises) {
//     try {
//       await command();
//     } catch (err) {
//       if (err.original) {
//         if (err.original.code === 'ER_DUP_ENTRY' || err.original.code === '23505') {
//           console.log(`>>> Passable error occurred: Duplicate entry`);
//         } else if (err.original.code === 'ER_DUP_FIELDNAME' || err.original.code === '42701') {
//           console.log(`>>> Passable error occurred: Duplicate field name`);
//         } else if (err.original.code === 'ER_CANT_DROP_FIELD_OR_KEY' || err.original.code === '2BP01') {
//           console.log(`>>> Passable error occurred: Cannot drop field or key`);
//         } else if (err.name === 'SequelizeUnknownConstraintError') {
//           console.log(`>>> Passable error. Trying to remove constraint that's already been removed.`);
//         } else {
//           console.log(err);
//           throw new Error(err);
//         }
//       } else {
//         console.log(err);
//         throw new Error(err);
//       }
//     }
//   }
// }

// export default {
//   run: runner,
// };