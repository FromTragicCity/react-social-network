import React from 'react';
import styles from './Dialogs.module.css';
import Message from './Message/Message.jsx';
import DialogItem from './DialogItem/DialogItem';
import ActionButton from '../Elements/Button';

const Dialogs = (props) => {
  const dialogsElements = props.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
  ));

  const messagesElements = props.messages.map((msg) => {
    return <Message key={msg.id} message={msg.message} />;
  });

  const onClickHandler = () => {
    if (props.newMessageText === '') {
      return alert('Message cannot be empty');
    }
    props.onClick();
  };

  const onChangeHandler = (event) => {
    let message = event.target.value;
    props.onChange(message);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <div className={styles.inputField}>
          <textarea
            value={props.newMessageText}
            onChange={onChangeHandler}
            placeholder='Start writing message...'
          ></textarea>

          <div className={styles.buttonContainer}>
            <ActionButton name='Send Message' onClick={onClickHandler} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dialogs;
