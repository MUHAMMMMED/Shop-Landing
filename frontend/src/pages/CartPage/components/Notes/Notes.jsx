
import React, { useState } from 'react';
import './Notes.css';
import EditNote from './components/EditNote/EditNote';
import NoteCreate from './components/NoteCreate/NoteCreate';

export default function Notes({ item, quantity, FetchCart, language }) {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const handleDisplayNotes = () => {
    setShowAllNotes(!showAllNotes);
  };
  const notesToDisplay = showAllNotes ? item?.notes : item?.notes.slice(0, 1);
  return (
    <>

      {quantity > (item?.notes.length) ? (
        <>
          <div style={{ textAlign: 'center', width: '100%', float: 'right', paddingTop: '5px' }}>
            <p className="flashText">

              {language === 'ar' ? 'تحتاج إلى إضافة المزيد' : 'You need to add more'}
              {quantity - (item && item.notes ? item.notes.length : 0)}
              {language === 'ar' ? 'ملاحظة' : 'Note'}

            </p>
          </div>
          <NoteCreate item={item} fetchCart={FetchCart} />
        </>
      ) : null}
      {quantity < (item?.notes.length) ? (
        <div style={{ textAlign: 'center', width: '100%', float: 'right', paddingTop: '5px' }}>
          <p className="flashText">
            {language === 'ar' ? 'تحتاج إلى إزالة' : 'You need to remove'}

            {(item && item.notes ? item.notes.length : 0) - quantity}
            {language === 'ar' ? 'ملاحظة' : 'Note'}

          </p>
        </div>
      ) : null}

      <>
        <div style={{ width: '100%', float: 'right' }}>
          {notesToDisplay.map((noteItem, index) => (
            <div className='note-card' key={index}>
              <div className='note-card-content'>
                <div className='note-card-icon'>{index + 1}</div>
                <div className='note-card-title'>
                  {noteItem?.note.length > 50 ? noteItem.note.substring(0, 50) + '...' : noteItem.note}
                </div>
              </div>
              <div className='note-card-but'>
                <EditNote noteItem={noteItem} fetchCart={FetchCart} />
              </div>  </div>))} </div>
      </>
      <div style={{ textAlign: 'center', width: '100%', float: 'right', paddingTop: '5px' }}>
        <button className="payment-button" type="button" onClick={handleDisplayNotes}>
          {showAllNotes ? "إخفاء الملاحظات" : (language === 'ar' ? "إخفاء الملاحظات" : "Hide Notes")}
        </button></div>
    </>
  );
}
