import React, { useState } from 'react';

const Form = ({ setStock }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setStock(input.toUpperCase());
    setInput('');
  };

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setInput(e.target.value)}
          value={input}
          placeholder="enter symbol"
        ></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default Form;
