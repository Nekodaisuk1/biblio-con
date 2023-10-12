import React, {useState} from 'react';
import styled from 'styled-components';

const Rect9 = styled.div`
  top: 124px;
  left: 93px;
  width: 294px;
  height: 138px;
  position: absolute;
  background-color: rgba(230,230, 230,0);
  border-width: 7px;
  border-color: #30903f;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 80%;  // Adjust as per your requirement
  height: 80%; // Adjust as per your requirement
  background-color: #f0f1e0;
  color: #309030;
  border: none;
  padding: 10px;
  font-size: 16px; // Adjust as per your requirement
  z-index: 1000;
  font-size: ${props => props.fontSize}px;
`;

function Rect9Input({ placeholder }) {
  const [inputValue, setInputValue] = useState('');
  const [fontSize, setFontSize] = useState(24); // 初期のfont-sizeを設定
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setFontSize(calculateFontSize(newValue.length)); // 文字数に基づいてfont-sizeを計算し設定
  };
  
  const calculateFontSize = (length) => {
    const baseSize = 24;
    const percentage = 100 - length * 2; // 2は調整可能
    return Math.max(12, (baseSize * percentage) / 100);
  };
  
  return (
    <Rect9>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        fontSize={fontSize}
      />
    </Rect9>
  );
}

export default Rect9Input;