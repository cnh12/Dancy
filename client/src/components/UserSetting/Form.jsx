import React, { useState } from "react";
import { styled } from "styled-components";
import * as JF from "./SettingForm.style";
import QuitModal from "./QuitModal";
import ChangePwdModal from "./ChangePwdModal";

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
  margin-right: ${(props) => props.margin || "0px"};

  input {
    accent-color: #f9405e;
  }
`;

export default function FormArea() {
  const [inputValue, setInputValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isChangePwdModalOpen, setIsChangePwdModalOpen] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  // 각 모달을 열기 위한 함수
  const openChangePwdModal = () => {
    setIsChangePwdModalOpen(true);
  };

  const openQuitModal = () => {
    setIsQuitModalOpen(true);
  };

  // 각 모달을 닫기 위한 함수
  const closeChangePwdModal = () => {
    setIsChangePwdModalOpen(false);
  };

  const closeQuitModal = () => {
    setIsQuitModalOpen(false);
  };

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 유효성 검사 등을 수행하여 유효하지 않은 경우에만 경고를 보이도록 설정
    setShowWarning(value.trim() === "");
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
        <JF.FormCategory margin="72px">닉네임</JF.FormCategory>
        <JF.FormInput type="text"></JF.FormInput>
        <JF.FormBtn>중복 체크</JF.FormBtn>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon visibility="hidden" />
        <JF.FormCategory margin="36px">상태메세지</JF.FormCategory>
        <InputContainer>
          <JF.FormInput type="text"></JF.FormInput>
        </InputContainer>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="68px">E-mail</JF.FormCategory>
        <InputContainer>
          <JF.FormInput type="email"></JF.FormInput>
        </InputContainer>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="54px">생년월일</JF.FormCategory>
        <JF.FormInput type="date"></JF.FormInput>
      </FormDetailArea>
      <FormDetailArea>
        <JF.MustIcon />
        <JF.FormCategory margin="91px">성별</JF.FormCategory>
        <RadioContainer margin="104.1px">
          <input type="radio" name="gender" value="male" /> 남성
          <input type="radio" name="gender" value="female" /> 여성
        </RadioContainer>
        <JF.FormBtn width="167px" onClick={openChangePwdModal}>
          비밀번호 변경
        </JF.FormBtn>
        {/*ChangePwdModal 컴포넌트를 렌더링하고 isOpen, onClose을 props로 전달 */}
        <ChangePwdModal isOpen={isChangePwdModalOpen} onClose={closeChangePwdModal} />
      </FormDetailArea>
      <FormDetailArea>
        <JF.QuitText onClick={openQuitModal}>회원 탈퇴</JF.QuitText>
        {/* QuitModal 컴포넌트를 렌더링하고 isOpen, onClose을 props로 전달 */}
        <QuitModal isOpen={isQuitModalOpen} onClose={closeQuitModal} />
      </FormDetailArea>
      <FormDetailArea>
        <JF.RegisterBtn margin="217px">완료</JF.RegisterBtn>
      </FormDetailArea>
    </JoinFormArea>
  );
}
