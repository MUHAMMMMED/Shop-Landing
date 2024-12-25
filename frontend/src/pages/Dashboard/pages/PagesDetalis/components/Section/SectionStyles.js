import styled from 'styled-components';

export const SectionContainerStyled = styled.div`
    padding: 6px;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-family);
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    float: right;
    width: calc(100% - 6px);  
`;

export const SectionTitle = styled.h2`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;



export const IconButton = styled.button`
    float: right;
    padding: 10px 15px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#000')};
    color: white;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-size: 16px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* For tooltip positioning */

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#0056b3')};
    }

   /* Tooltip */
   &:hover::after {
     content: attr(data-tooltip);
     position: absolute;
     bottom: 120%;
     left: 50%;
     transform: translateX(-50%);
     background-color: #000;
     color: #fff;
     padding: 5px 8px;
     border-radius: 4px;
     white-space: nowrap;
     font-size: 12px;
     opacity: 1;
     pointer-events: none;
     transition: opacity 0.3s;
   }

   /* السهم الصغير للتوضيح */
   &:hover::before {
     content: '';
     position: absolute;
     bottom: 110%;
     left: 50%;
     transform: translateX(-50%);
     border-width: 5px;
     border-style: solid;
     border-color: #000 transparent transparent transparent;
     opacity: 1;
     transition: opacity 0.3s;
   }

   /* إخفاء التوضيح بشكل افتراضي */
   &::after,
   &::before {
     opacity: 0;
   }
  
   &:focus {
       outline: none;
       box-shadow: 0 0 0 2px #0056b3;
   }
 `;



export const SectionButton = styled.button`

    /* direction:rtl;
    padding: 9px 11px;
    border: none;
    border-radius: 30px;
    background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#000')};
    color: white;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-size: 17px;
    font-weight:700;
    transition: background-color 0.3s;
    position: absolute;  
    bottom:10px;
    z-index:33;
    right:25px; */

    float: right;
    padding: 10px 15px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#000')};
    color: white;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-size: 16px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* For tooltip positioning */



    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#0056b3')};
    }

   /* Tooltip */
   &:hover::after {
     content: attr(data-tooltip);
     position: absolute;
     bottom: 120%;
     left: 50%;
     transform: translateX(-50%);
     background-color: #000;
     color: #fff;
     padding: 5px 8px;
     border-radius: 4px;
     white-space: nowrap;
     font-size: 12px;
     opacity: 1;
     pointer-events: none;
     transition: opacity 0.3s;
   }

   /* السهم الصغير للتوضيح */
   &:hover::before {
     content: '';
     position: absolute;
     bottom: 110%;
     left: 50%;
     transform: translateX(-50%);
     border-width: 5px;
     border-style: solid;
     border-color: #000 transparent transparent transparent;
     opacity: 1;
     transition: opacity 0.3s;
   }

   /* إخفاء التوضيح بشكل افتراضي */
   &::after,
   &::before {
     opacity: 0;
   }
  
   &:focus {
       outline: none;
       box-shadow: 0 0 0 2px #0056b3;
   }
 `;
