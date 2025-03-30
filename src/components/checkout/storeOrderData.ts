import { toast } from "sonner";

interface OrderInfo {
  Name: string;
  mobileNumber: number;
  email: string;
  address: string;
  optionalAddress?: string;
  townCity: string;
}

export async function StoreOrderData(
  params: OrderInfo,
  amount: number,
  is_paid: boolean,
  cod?: boolean
): Promise<string> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    Name: params.Name,
    mobileNumber: params.mobileNumber,
    email: params.email,
    address: params.address,
    optionalAddress: params.optionalAddress,
    townCity: params.townCity,
    amount: amount,
    cod: cod,
    is_paid: is_paid,
  });

  const fetchResult: string = await fetch(
    "http://localhost:3000/api/placeOrder",
    {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
  )
    .then((response) => response.json())
    .then((result: { message: string }) => {
      return result.message;
    })
    .catch((error: { message: string }) => {
      return error.message;
    });
  return fetchResult;
}
