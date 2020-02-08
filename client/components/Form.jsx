import React, { useState } from 'react';

const Form = ({ setStock }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setStock(input);
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setInput(e.target.value)}></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default Form;
