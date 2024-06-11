// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import {
//   useGetAllUsersQuery,
//   useGetUserByIdQuery,
// } from "../../redux/features/user";
// import { useSearchMaintenanceRequestsMutation } from "../../redux/features/maintenanceRequest";

// const CreatePayment = () => {
//   const [user, setUser] = useState("");
//   const [request, setRequest] = useState("");
//   const [requests, setRequests] = useState([]);
//   const [amount, setAmount] = useState("");
//   const [reason, setReason] = useState("");
//   const [additionalInfo, setAdditionalInfo] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const { data, error, status } = useGetAllUsersQuery();
//   const [searchRequests] = useSearchMaintenanceRequestsMutation();
//   console.log(data, error, status);
//   console.log(user);

//   const handleSearchRequests = async (requesterId) => {
//     try {
//       const res = await searchRequests({ requesterId }).unwrap();
//       setRequests(res.items);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const requesterId = user ? Number(user) : null;
//   console.log(requesterId);
//   if (requesterId) {
//     console.log(requesterId);
//     handleSearchRequests(requesterId);
//   }

//   //   useEffect(() => {
//   //     if (user) {
//   //       // Fetch requests based on the selected user
//   //       //   console.log(requestById, reqByIdErr, reqByIdStat);
//   //       if (userStat === "fulfilled") {
//   //         setRequests(singleUser || {});
//   //       } else {
//   //         setRequests({});
//   //       }
//   //     } else {
//   //       setRequests({});
//   //     }
//   //   }, [user, singleUser, userStat]);

//   if (status === "pending") {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error || !data) {
//     return (
//       <Box sx={{ padding: 4 }}>
//         <Typography variant="h6" color="error">
//           Failed to load payment details.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission logic here
//     console.log({
//       user,
//       request,
//       amount,
//       reason,
//       additionalInfo,
//       paymentMethod,
//     });
//   };

//   return (
//     <Container sx={{ marginTop: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Create Payment
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               select
//               label="Select User"
//               value={user}
//               onChange={(e) => setUser(e.target.value)}
//               sx={{ minWidth: 240 }}
//               fullWidth
//             >
//               {data.items.map((item) => (
//                 <MenuItem key={item.id} value={item.id}>
//                   {item.email}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           {requests != [] && (
//             <Grid item xs={6}>
//               <TextField
//                 select
//                 label="Select Request"
//                 value={request}
//                 onChange={(e) => setRequest(e.target.value)}
//                 sx={{ minWidth: 240 }}
//                 fullWidth
//               >
//                 {/* {userStat === "fulfilled" &&
//                   Object.keys(singleUser).map((req) => (
//                     <MenuItem key={req.id} value={req.id}>
//                       {req.subject}
//                     </MenuItem>
//                   ))} */}
//                 {requests.map((req) => (
//                   <MenuItem key={req.id} value={req.id}>
//                     {req.subject}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           )}
//         </Grid>
//         <TextField
//           label="Amount"
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           sx={{ marginBottom: 2, marginTop: 2, minWidth: 240 }}
//           fullWidth
//         />
//         <TextField
//           label="Reason"
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           sx={{ marginBottom: 2, minWidth: 240 }}
//           fullWidth
//         />
//         <TextField
//           label="Additional Information"
//           value={additionalInfo}
//           onChange={(e) => setAdditionalInfo(e.target.value)}
//           sx={{ marginBottom: 2, minWidth: 240 }}
//           fullWidth
//           multiline
//           rows={4}
//         />
//         <TextField
//           select
//           label="Payment Method"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           sx={{ marginBottom: 2, minWidth: 240 }}
//           fullWidth
//         >
//           <MenuItem value="credit_card">Credit Card</MenuItem>
//           <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
//           <MenuItem value="cash">Cash</MenuItem>
//         </TextField>
//         <Box textAlign="center">
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ marginTop: 2 }}
//           >
//             Submit Payment
//           </Button>
//         </Box>
//       </form>
//     </Container>
//   );
// };

// export default CreatePayment;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useGetAllUsersQuery } from "../../redux/features/user";
import { useSearchMaintenanceRequestsMutation } from "../../redux/features/maintenanceRequest";
import { useCreatePaymentMutation } from "../../redux/features/payment";

const CreatePayment = () => {
  const [user, setUser] = useState("");
  const [request, setRequest] = useState("");
  const [requests, setRequests] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { data, error, status } = useGetAllUsersQuery();
  const [searchRequests] = useSearchMaintenanceRequestsMutation();
  const [createPayment] = useCreatePaymentMutation();

  console.log(data, error, status);
  console.log(request, user);

  useEffect(() => {
    const handleSearchRequests = async (requesterId) => {
      try {
        const res = await searchRequests({ requesterId }).unwrap();
        setRequests(res.items);
      } catch (error) {
        console.error(error);
      }
    };

    const requesterId = user ? Number(user) : null;
    if (requesterId) {
      handleSearchRequests(requesterId);
    }
  }, [user]);

  if (status === "pending") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load payment details.
        </Typography>
      </Box>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      user,
      request,
      amount,
      reason,
      additionalInfo,
      paymentMethod,
    });
    const formData = new FormData();
    formData.append("userId", user);
    formData.append("requestId", request);
    formData.append("amount", amount);
    formData.append("reason", reason);
    formData.append("additionalInfo", additionalInfo);
    formData.append("paymentMethod", paymentMethod);

    try {
      //   const res = await createPayment({
      //     userId: user,
      //     requestId: request,
      //     amount,
      //     reason,
      //     additionalInfo,
      //     paymentMethod,
      //   }).unwrap();
      console.log(formData.get("userId"));
      const res = await createPayment(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Payment
      </Typography>
      <form
        onSubmit={() => {
          handleSubmit;
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Select User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              sx={{ minWidth: 240 }}
              fullWidth
            >
              {data.items.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.email}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {requests.length > 0 && (
            <Grid item xs={6}>
              <TextField
                select
                label="Select Request"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                sx={{ minWidth: 240 }}
                fullWidth
              >
                {requests.map((req) => (
                  <MenuItem key={req.id} value={req.id}>
                    {req.subject}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          sx={{ marginBottom: 2, marginTop: 2, minWidth: 240 }}
          fullWidth
        />
        <TextField
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ marginBottom: 2, minWidth: 240 }}
          fullWidth
        />
        <TextField
          label="Additional Information"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          sx={{ marginBottom: 2, minWidth: 240 }}
          fullWidth
          multiline
          rows={4}
        />
        <TextField
          select
          label="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{ marginBottom: 2, minWidth: 240 }}
          fullWidth
        >
          <MenuItem value="credit_card">Credit Card</MenuItem>
          <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
          <MenuItem value="cash">Cash</MenuItem>
        </TextField>
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit Payment
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreatePayment;
