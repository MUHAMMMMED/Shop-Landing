import styled from 'styled-components';

// الحاوية الرئيسية
export const ContainerModules = styled.div`
  width: 100%;
  padding: 0px;
  border-radius: 8px;
`;

// عنصر الموديول
export const ModuleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  margin: 10px 0;
  border: 2px dashed #000;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// محتوى الموديول
export const ModuleContent = styled.div`
  margin-top: 10px;
  width: 100%;
`;


// ModuleHeader Styled Component
export const ModuleHeader = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center;   */
  width: 100%;
  margin-bottom: 0px;

  /* توزيع العناصر أفقيًا في الديسكتوب والتابلت */
  @media (min-width: 769px) {
    flex-direction: row;
    gap: 20px; /* مساحة بين العناصر */
  }

  /* توزيع العناصر عموديًا في الموبايل */
  @media (max-width: 768px) {
    position:relative;
    display: blank;
    justify-content:none;  
    float: right; 
    width: 100%;  
  }
`;

// ThemesContainer Styled Component
export const ThemesContainer = styled.div`
  width:  100%;
  display: flex;
  justify-content: center; /* تمركز المحتويات */
  align-items: center;
  padding: 0px;
  direction:rtl;
  /* في الديسكتوب والتابلت */
  @media (min-width: 769px) {
    flex: 1;
    justify-content: center;
  }

  /* في الموبايل */
  @media (max-width: 768px) {
   
    float: right!important;
     width: 100%!important;
    padding: 0; /* تعد يل البادينج إذا لزم الأمر */
  }
`;


export const IconsContainer = styled.div`
  width: 100%;
  float:right;
  padding: 0px;
  gap: 10px;
  direction:rtl;

 
  @media (min-width: 770px) {
    flex-direction: row;
    gap: 10px;
  }
 
 
  @media (max-width: 480px) {
    float: right!important;
     width: 100%!important;

  }
  @media (max-width: 300px) {
    float: right!important;
     width: 100%!important;
background:red;
  }
`;



export const IconButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? '#a0a0a0' : '#000')};
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  transition: background-color 0.3s;
  position: relative;
  flex: 1; /* ليشغل المساحة المتاحة داخل IconsContainer */

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

  /* Tooltip Arrow */
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

  /* Hide Tooltip by Default */
  &::after,
  &::before {
    opacity: 0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0056b3;
  }

  /* تعديل حجم الأيقونات في الموبايل */
  @media (max-width: 768px) {
    flex: 1 1 45%; /* يجعل الأيقونات تأخذ تقريبًا نصف العرض */
    font-size: 14px;
  }

  @media (max-width: 400px) {
    flex: 1 1 100%;  
     font-size: 12px;
    padding: 8px 0;  
  
    float:right:
  }
`;






// الكونتينر الرئيسي
export const MainContainer = styled.div`
  max-width: 1200px; /* أقصى عرض للكونتينر */
  margin: 0 auto; /* مركز الكونتينر */
  padding: 16px; /* حواف داخلية */
  background-color: #f4f4f4; /* لون الخلفية */
  display: flex; /* استخدام الفليكس لتوزيع العناصر */
  flex-direction: column; /* الاتجاه العمودي */
  min-height: 100vh; /* ارتفاع الكونتينر ليملأ الشاشة بالكامل */

  /* الهواتف المحمولة */
  @media (max-width: 600px) {
    padding: 8px; /* تقليل الحواف */
  }

  /* الأجهزة اللوحية */
  @media (min-width: 601px) and (max-width: 900px) {
    padding: 12px; /* حواف متوسطة */
  }

  /* أجهزة الكمبيوتر المحمولة */
  @media (min-width: 901px) and (max-width: 1200px) {
    padding: 16px; /* حواف أكبر */
  }

  /* أجهزة الكمبيوتر المكتبية */
  @media (min-width: 1201px) {
    padding: 20px; /* حواف كبيرة */
  }
`;
