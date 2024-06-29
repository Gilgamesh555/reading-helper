import Image from "next/image";

export const Button = () => {
  const handleClick = () => {
    alert("Button clicked");
  };

  return <button onClick={handleClick}>Click me</button>;
};

export default function HomeApp() {
  const user = {
    name: "Hedy Lamarr",
    imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
    size: 90,
  };

  const products = [
    { title: "Cabbage", id: 1, isFruit: false },
    { title: "Garlic", id: 2, isFruit: false },
    { title: "Apple", id: 3, isFruit: true },
  ];

  const listOfItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "magenta" : "inherit",
      }}
    >
      {product.title}
    </li>
  ));

  const isLogin = true;

  return (
    <main>
      <h1>{user.name}</h1>
      <Image
        className="avatar"
        alt={`Photo of ${user.name}`}
        src={user.imageUrl}
        width={user.size}
        height={user.size}
      />
      <Button />
      <div>{isLogin ? <AdminPanel /> : <LoginForm />}</div>

      <ul>{listOfItems}</ul>
    </main>
  );
}

export const AdminPanel = () => {
  return <div>Admin Panel</div>;
};

export const LoginForm = () => {
  return <div>Login Form</div>;
};
