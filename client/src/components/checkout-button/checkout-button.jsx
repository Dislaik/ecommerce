import axios from "axios";

export default function CheckoutButton({ orderId, amount }) {
  const handlePay = async () => {
    const res = await axios.post("http://localhost:8080/api/v1/payment/create", {
      orderId,
      amount,
    });

    const { token, url } = res.data;

    // Crear formulario y redirigir
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = token;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
  };

  return <button onClick={handlePay}>Pagar</button>;
}