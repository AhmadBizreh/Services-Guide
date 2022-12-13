// import { authAction } from './auth';





// // export const fetchCartData = () => {
// //     return async (dispatch) => {
// //         const fetchData = async () => {
// //             const response = await fetch(
// //                 'https://addtocart-84e3c-default-rtdb.firebaseio.com/cart.json'
// //             );

// //             if (!response.ok ) {

// //                 throw new Error('Could not fetch cart data!');
// //             }
// //             const data = await response.json();
// //             return data;
// //         };
// //         try {
// //             const cartData = await fetchData();            
// //             if (cartData !== null) {
// //                 dispatch(
// //                     cartActions.replaceCart({
// //                         items: cartData.items || [],
// //                         totalQuantity: cartData.totalQuantity,
// //                     })
// //                 );
// //             }else{
// //                 dispatch(
// //                     uiActions.showNotification({
// //                         status: 'pending',
// //                         title: 'Error!',
// //                         message: 'No data have added yet ...',
// //                     })
// //                 );
// //             }

// //         } catch (error) {
// //             dispatch(
// //                 uiActions.showNotification({
// //                     status: 'error',
// //                     title: 'Error!',
// //                     message: 'Fetching cart data failed!',
// //                 })
// //             );
// //         }
// //     };
// // };


// export const SendLogin = (Email, Password) => {
     
//     console.log('sendLogin');
//     // dispatch(authAction.login());
//     return async (dispatch) => {
//         dispatch(
//             authAction.showNotification({
//                 status: 'pending',
//                 title: 'Sending...',
//                 message: 'Sending cart data!',
//             })
//         );

//         const sendRequest = async () => {
//             const response = await fetch(
//                 'http://servicescatalog.somee.com/api/Users/Login',
//                 {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         Email: Email,
//                         Password: Password,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error('Login failed.');                                
//             }
            
//         };

//         try {
//             await sendRequest();          
            
//             dispatch(
//                 authAction.showNotification({
//                     status: 'success',
//                     title: 'Success!',
//                     message: 'Sent cart data successfully!',
//                 })

//             );
//             console.log('login  successfully');

//         } catch (error) {
//             dispatch(
//                 authAction.showNotification({
//                     status: 'error',
//                     title: 'Error!',
//                     message: 'Login failed!',
//                 })
//             );
//         }
//     };
// };
