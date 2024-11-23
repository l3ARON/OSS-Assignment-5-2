import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdatePage.css";

function UpdatePage() {
    const { id } = useParams(); // URL에서 id 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 hook
    const [player, setPlayer] = useState(null); // 플레이어 데이터 상태
    const [tempPlayer, setTempPlayer] = useState(null); // 수정 전 임시 데이터
    const [errorFields, setErrorFields] = useState([]); // 잘못된 필드 추적
    const [changeCount, setChangeCount] = useState(0); // 수정 횟수 추적

    // 각 입력 필드를 참조하기 위한 useRef
    const nameRef = useRef();
    const numberRef = useRef();
    const nationalityRef = useRef();
    const totalGoalRef = useRef();
    const totalAssistRef = useRef();

    // 데이터 가져오기
    useEffect(() => {
        fetch(`https://672818aa270bd0b975544f46.mockapi.io/api/v1/players/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPlayer(data);
                setTempPlayer(data); // 초기 데이터를 임시 상태로 저장
            });
    }, [id]);

    // 필드 유효성 검사 및 포커스 이동
    const validateField = (name, value) => {
        const refMap = {
            name: nameRef,
            number: numberRef,
            nationality: nationalityRef,
            total_goal: totalGoalRef,
            total_assist: totalAssistRef,
        };

        if (name === "number" || name === "total_goal" || name === "total_assist") {
            if (!value || Number(value) < 0) {
                setErrorFields((prevErrors) => [...new Set([...prevErrors, name])]);
                refMap[name].current.focus(); // 잘못된 입력 시 해당 필드로 포커스 이동
                return false;
            }
        } else if (!value || value.trim() === "") {
            setErrorFields((prevErrors) => [...new Set([...prevErrors, name])]);
            refMap[name].current.focus(); // 잘못된 입력 시 해당 필드로 포커스 이동
            return false;
        }

        // 유효한 경우 오류 필드에서 제거
        setErrorFields((prevErrors) => prevErrors.filter((field) => field !== name));
        return true;
    };

    // 입력값 변경 처리 및 서버 업데이트
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const updatedPlayer = { ...tempPlayer, [name]: value };

        setTempPlayer(updatedPlayer); // 상태 업데이트
        setChangeCount((prevCount) => prevCount + 1); // 수정 횟수 증가

        if (validateField(name, value)) {
            try {
                // 즉시 서버 업데이트
                await fetch(`https://672818aa270bd0b975544f46.mockapi.io/api/v1/players/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedPlayer),
                });
            } catch (error) {
                console.error("Error updating player:", error);
            }
        }
    };

    // 돌아가기 버튼 클릭 시 리스트로 이동
    const comebackhome = () => {
        navigate("/list");
    };

    // 로딩 완료 후 렌더링
    return player ? (
        <div className="UpdatePage">
            <h2>Update Player: {player.name}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={tempPlayer.name || ""}
                        onChange={handleChange}
                        ref={nameRef}
                        className={errorFields.includes("name") ? "error" : ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Number:</label>
                    <input
                        id="number"
                        type="number"
                        name="number"
                        value={tempPlayer.number || ""}
                        onChange={handleChange}
                        ref={numberRef}
                        className={errorFields.includes("number") ? "error" : ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="total_goal">Total Goals:</label>
                    <input
                        id="total_goal"
                        type="number"
                        name="total_goal"
                        value={tempPlayer.total_goal || ""}
                        onChange={handleChange}
                        ref={totalGoalRef}
                        className={errorFields.includes("total_goal") ? "error" : ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="total_assist">Total Assists:</label>
                    <input
                        id="total_assist"
                        type="number"
                        name="total_assist"
                        value={tempPlayer.total_assist || ""}
                        onChange={handleChange}
                        ref={totalAssistRef}
                        className={errorFields.includes("total_assist") ? "error" : ""}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nationality">Nationality:</label>
                    <input
                        id="nationality"
                        type="text"
                        name="nationality"
                        value={tempPlayer.nationality || ""}
                        onChange={handleChange}
                        ref={nationalityRef}
                        className={errorFields.includes("nationality") ? "error" : ""}
                    />
                </div>

                {errorFields.length > 0 && (
                    <p style={{ color: "red" }}>입력값이 잘못되었습니다. 확인해주세요!</p>
                )}

                <button type="button" onClick={comebackhome}>
                    돌아가기
                </button>
            </form>
            <p>Total Changes: {changeCount}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default UpdatePage;
