import { toast } from "sonner";

interface OrderInfo {
  Name: string;
  email: string;
  address: string;
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
    email: params.email,
    address: params.address,
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
