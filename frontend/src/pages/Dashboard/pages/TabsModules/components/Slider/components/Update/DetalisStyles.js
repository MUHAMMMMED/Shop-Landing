import styled from 'styled-components'; // Import styled-components

export const IconButton = styled.button`
  position: relative;
  margin: 0 5px;
  border: 2px dashed #000;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? '#ebebebde' : '#fff')};
  color: #000;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 20px;
  padding: 10px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover:not(:disabled) {
    color: #fff;
    background-color: #000;
  }

  &:hover:not(:disabled)::after {
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
    z-index: 10;
  }

  &:hover:not(:disabled)::before {
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
    z-index: 10;
  }

  &::after,
  &::before {
    opacity: 0;
  }
`;

export const SectionTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  direction: rtl;
  width: 100%;
`;