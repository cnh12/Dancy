import React, { useState } from "react";
import { styled } from "styled-components";
import * as JF from "./JoinForm.style";
import CustomModal from "./PinModal";
import { emailCheck } from "../../api/join";
import { httpStatusCode } from "../../util/http-status";

// 전체 폼 구성
export const JoinFormArea = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

// 필수 항목 공지
export const NoticeArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

// 폼 매 줄 마다 설정
export const FormDetailArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 1rem;
  gap: 20px;
`;

// 텍스트 엔터 처리
export const EnterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-right: ${(props) => props.margin || "0px"};
`;

export const InputContainer = styled.div`
  position: relative;
`;

// 라디오 버튼 커스텀
export const RadioContainer = styled.div`
  display: flex;
  font-family: "NYJ Gothic B";
  font-size: 16px;
  gap: 12px;

  input {
    accent-color: #f9405e;
  }
`;

export const InputColunmArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FormArea() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    checkpassword: "",
    birthdate: "",
    gender: "",
    nickname: "",
  });
  const [showWarnings, setShowWarnings] = useState({
    email: { show: false, message: "" },
    password: false,
    checkpassword: false,
    birthdate: false,
    gender: false,
    nickname: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태를 관리
  const [submittedPin, setSubmittedPin] = useState(""); // 모달에서 제출된 PIN을 저장

  // 모달을 열기 위한 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달에서 PIN이 제출됐을 때 실행되는 함수
  const handlePinSubmit = (pin) => {
    console.log(`Submitted PIN: ${pin}`);
    setSubmittedPin(pin); // 제출된 PIN을 상태값에 저장
    closeModal(); // PIN이 제출되면 모달을 닫음
  };

  // const inputChangeHandler = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   // 유효성 검사 등을 수행하여 유효하지 않은 경우에만 경고를 보이도록 설정
  //   setShowWarning(value.trim() === "");
  // };

  const handleInputChange = (inputName, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
    //형식이 맞으면 경고 상태 초기화 해주기 !
    setShowWarnings((prevWarnings) => ({
      ...prevWarnings,
      [inputName]: { show: false, message: "" },
    }));

    console.log(showWarnings.email.show);
  };

  const handleAuthentication = async () => {
    // 이메일 형식 체크
    if (!validateEmail(inputValues.email)) {
      setShowWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: { show: true, message: "유효하지 않은 이메일 형식입니다." },
      }));
      return;
    }

    try {
      // 서버에 이메일 중복 여부 확인 요청
      const isEmailDuplicate = await checkEmailDuplicate(inputValues.email);

      if (isEmailDuplicate) {
        setShowWarnings((prevWarnings) => ({
          ...prevWarnings,
          email: { show: true, message: "중복된 이메일입니다." },
        }));
        return;
      }

      // 서버 통신 로직
      openModal();
    } catch (error) {
      console.error("Authentication failed:", error);
      // 서버에서 에러가 발생한 경우에 대한 처리
    }
  };

  // 이메일 형식 체크 함수
  const validateEmail = (email) => {
    // 간단한 이메일 형식 체크 로직
    return /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i.test(
      email
    );
  };

  // 서버에 이메일 중복 여부를 확인하는 함수
  const checkEmailDuplicate = async (email) => {
    // 서버와 통신하여 이메일 중복 여부를 확인하는 로직
    // true: 중복된 이메일, false: 중복되지 않은 이메일

    const response = await emailCheck(email);
    // 상태 코드에 따라 다른 처리 수행
    if (response === httpStatusCode.OK) {
      // 성공적인 응답
      return false;
    } else if (response === httpStatusCode.CONFLICT) {
      return true;
    }
  };

  return (
    <JoinFormArea>
      <NoticeArea>
        <JF.MustNoticeText>(&nbsp;</JF.MustNoticeText>
        <JF.MustIcon />
        <JF.MustNoticeText>&nbsp;)는 필수 입력 값입니다.</JF.MustNoticeText>
      </NoticeArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="76px">E-mail</JF.FormCategory>
        <InputColunmArea>
          <JF.FormInput
            type="email"
            value={inputValues.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          ></JF.FormInput>
          <JF.InputNoticeText show={showWarnings.email.show}>
            {showWarnings.email.message}
          </JF.InputNoticeText>
        </InputColunmArea>
        <JF.FormBtn onClick={handleAuthentication}>인증하기</JF.FormBtn>
        {/* CustomModal 컴포넌트를 렌더링하고 isOpen, onClose, onSubmit을 props로 전달 */}
        <CustomModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handlePinSubmit} />
        {/* PIN이 제출되면 해당 내용을 출력 */}
        {submittedPin && <p>인증번호: {submittedPin}</p>}
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="62px">비밀번호</JF.FormCategory>
        <InputContainer>
          <JF.FormInput
            type="password"
            value={inputValues.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          ></JF.FormInput>
          <JF.InputNoticeText show={showWarnings.password}>
            형식을 만족하지 않는 비밀번호입니다.
          </JF.InputNoticeText>
        </InputContainer>
        <EnterArea>
          <JF.MustNoticeText>영문자, 숫자, 특수문자를 조합하여</JF.MustNoticeText>
          <JF.MustNoticeText>입력해주세요. (8자 이상)</JF.MustNoticeText>
        </EnterArea>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="19px">비밀번호 확인</JF.FormCategory>
        <InputContainer>
          <JF.FormInput type="password"></JF.FormInput>
        </InputContainer>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="62px">생년월일</JF.FormCategory>
        <JF.FormInput type="date"></JF.FormInput>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="99px">성별</JF.FormCategory>
        <RadioContainer>
          <input type="radio" name="gender" value="male" /> 남성
          <input type="radio" name="gender" value="female" /> 여성
        </RadioContainer>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="80px">닉네임</JF.FormCategory>
        <JF.FormInput></JF.FormInput>
        <JF.FormBtn>중복 확인</JF.FormBtn>
      </FormDetailArea>
    </JoinFormArea>
  );
}
