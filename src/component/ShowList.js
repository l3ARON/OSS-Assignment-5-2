import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ShowList.css";

function ShowList() {
    const [data, setData] = useState([]); // 가져온 데이터 상태

    // 데이터 가져오기 함수
    const getTest = () => {
        axios
            .get("https://672818aa270bd0b975544f46.mockapi.io/api/v1/players")
            .then((response) => {
                console.log(JSON.stringify(response.data)); // 가져온 데이터 콘솔 출력
                setData(response.data); // 데이터 상태 업데이트
            })
            .catch((error) => {
                console.error(error); // 에러 로그 출력
            });
    };

    // 플레이어 삭제 함수
    const deletePlayer = async (id) => {
        try {
            const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
            if (!confirmDelete) return; // 사용자가 취소를 누르면 함수 종료
    
            await axios.delete(`https://672818aa270bd0b975544f46.mockapi.io/api/v1/players/${id}`);
            setData(data.filter((player) => player.id !== id)); // 삭제 후 상태 업데이트
            alert("삭제 성공!"); // 성공 메시지
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <div>
            <h1>Player Management</h1>
            <h3>이름을 클릭하여 세부내용 수정</h3>

            <button onClick={getTest}>불러오기</button>

            <Link to="/add" className="link-button">
                생성하기
            </Link>


            <table>
                <thead>
                    <tr className="div_first2">
                        <th>ID</th>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Total Goals</th>
                        <th>Total Assists</th>
                        <th>Nationality</th> 
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((player) => (
                        <tr key={player.id}>
                            <td>{player.id}</td>
                            <td>{player.number}</td>
                            <td>
                                <Link to={`/update/${player.id}`}>{player.name}</Link>
                            </td>
                            <td>{player.total_goal}</td>
                            <td>{player.total_assist}</td>
                            <td>{player.nationality}</td>
                            <td>
                                <button onClick={() => deletePlayer(player.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowList;
