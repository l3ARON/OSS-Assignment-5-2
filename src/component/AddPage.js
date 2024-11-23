import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPage.css"

function AddPage() {
    const [player, setPlayer] = useState({
        name: "",
        number: "",
        total_goal: "",
        total_assist: "",
        nationality: "",
    });

    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    // 각 입력 필드를 참조하기 위한 useRef
    const nameRef = useRef();
    const numberRef = useRef();
    const nationalityRef = useRef();
    const totalGoalRef = useRef();
    const totalAssistRef = useRef();

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
    };

    // 유효성 검사 및 포커스 이동
    const validateFields = () => {
        if (!player.name) {
            alert("선수의 이름을 입력하세요.");
            nameRef.current.focus();
            return false;
        }
        if (!player.number) {
            alert("해당 선수의 등번호를 입력하세요.");
            numberRef.current.focus();
            return false;
        }
        if (player.number <= 0) {
            alert("등번호는 0보다 커야 합니다.");
            numberRef.current.focus();
            return false;
        }
        if (!player.total_goal) {
            alert("해당 선수의 총 득점을 입력하세요.");
            totalGoalRef.current.focus();
            return false;
        }
        if (player.total_goal < 0) {
            alert("총 득점은 0 이상이어야 합니다.");
            totalGoalRef.current.focus();
            return false;
        }
        if (!player.total_assist) {
            alert("해당 선수의 총 도움을 입력하세요.");
            totalAssistRef.current.focus();
            return false;
        }
        if (player.total_assist < 0) {
            alert("총 도움은 0 이상이어야 합니다.");
            totalAssistRef.current.focus();
            return false;
        }
        if (!player.nationality) {
            alert("선수의 국적을 입력하세요.");
            nationalityRef.current.focus();
            return false;
        }
        return true;
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return; // 유효성 검사 실패 시 중단

        try {
            const response = await fetch(
                "https://672818aa270bd0b975544f46.mockapi.io/api/v1/players",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(player),
                }
            );
            if (response.ok) {
                alert("선수를 추가하였습니다.");
                navigate("/list");
            } else {
                alert("선수 추가에 실패하였습니다.");
            }
        } catch (error) {
            console.error("Error adding player:", error);
            alert("선수 추가 중 오류가 발생하였습니다.");
        }
    };

    const handleCancel = () => {
        alert("취소하였습니다.");
        navigate("/list"); // 리스트 페이지로 이동
    };

    return (
        <div className="AddPage">
            <form onSubmit={handleSubmit}>
            <h2>Add a New Player</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={player.name}
                    onChange={handleChange}
                    ref={nameRef} // 참조 추가
                />
            </label>
            <br />
            <label>
                Number:
                <input
                    type="number"
                    name="number"
                    value={player.number}
                    onChange={handleChange}
                    ref={numberRef} // 참조 추가
                />
            </label>
            <br />
            <label>
                Total Goals:
                <input
                    type="number"
                    name="total_goal"
                    value={player.total_goal}
                    onChange={handleChange}
                    ref={totalGoalRef} // 참조 추가
                />
            </label>
            <br />
            <label>
                Total Assists:
                <input
                    type="number"
                    name="total_assist"
                    value={player.total_assist}
                    onChange={handleChange}
                    ref={totalAssistRef} // 참조 추가
                />
            </label>
            <br />
            <label>
                Nationality:
                <input
                    type="text"
                    name="nationality"
                    value={player.nationality}
                    onChange={handleChange}
                    ref={nationalityRef} // 참조 추가
                />
            </label>
            <br />
            <button type="submit">확인</button>
            <button type="button" onClick={handleCancel}>
                취소
            </button>
            </form>
        </div>
    );
}

export default AddPage;
