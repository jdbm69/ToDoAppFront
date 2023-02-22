import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../styles/Modal.css';

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progres: editMode ? task.progres : 50,
    date: editMode ? task.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setShowModal(false);
      getData();
    } catch (err) {
      console.error(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setShowModal(false);
      getData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(data => ({
      ...data,
      [name] : value
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-title'>
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false) } id='exit'>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <form>
          <input 
            required
            maxLength={30}
            placeholder='Your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}  
          />
          <br/>
          <label for='range'>Drag to select your current progress</label>
          <input 
            required
            type='range'
            id='range'
            min='0'
            max='100'
            name='progres'
            value={data.progres}
            onChange={handleChange}
          />
          <input className={mode} type='submit' id='send' onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  );
}
  
export default Modal;