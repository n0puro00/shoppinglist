import { useEffect, useState } from 'react';
import './App.css';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    let status = 0;
    fetch(URL + 'add.php')
      .then(res => {
        status = parseInt(res.status);
        return res.json();
      })
      .then((res) => {
        if (status === 200) {
          setItems(res);
        } else {
          alert(res.error)
        }
      }, (error) => {
        alert(error);
      })
  }, [])

  const deleteTask = (id) => {
    let status = 0;
    fetch(URL + 'delete.php', {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then((res) => {
        status = parseInt(res.status);
        return res.json();
      })
      .then((res) => {
        if (status === 200) {
          setItems(items.filter((item) => {
            return item.id !== id;
          }));
        } else {
          alert(res.error)
        }
      }, (error) => {
        alert(error);
      })
  }

  const save = (e) => {
    e.preventDefault();
    let status = 0;
    fetch(URL + "post.php", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: desc,
        amount: amount
      })
    })
      .then((res) => {
        status = parseInt(res.status);
        return res.json();
      })
      .then((res) => {
        if (status === 200) {
          setItems([...items, res]);
          setAmount("");
          setDesc("");
        } else {
          alert(res.error)
        }
      }, (error) => {
        alert(error);
      })
  }

  return (
    <div>
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New item </label>
        <input value={desc} placeholder="type description" onChange={e => setDesc(e.target.value)} />
        <input type="number" value={amount} placeholder="type amount" onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>

      {items.map(item => (
        <div key={item.id} className="spacing">
          <p>{item.description}</p>
          <p>{item.amount}</p>
          <button onClick={() => deleteTask(item.id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default App;