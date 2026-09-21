import { useRef } from "react";
import "../../styles/addFriendPage.css"
import { useQueryClient, useMutation } from "@tanstack/react-query";

const AddFriendPage = () => {
    const userNameRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["friend"], mutationFn: async () => {

            const dataBlock = {
                username: userNameRef.current?.value
            }

            const response = await fetch("/contacts/add-contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataBlock),
                credentials: "include"
            })

            if (response.ok) {
                queryClient.invalidateQueries({ queryKey: ["friends"] })
            }
        }
    })

    const addFriendHandler = () => {
        mutation.mutate();
    }

    return <div className="add-friend-page">
        <h2 className="title">Добавить в друзья</h2>
        <h4 className="sub-title">Вы можете добавить друзей по имени пользователя</h4>
        <div className="input-field">
            <input type="text" placeholder="Введите имя пользователя" maxLength={36} ref={userNameRef} />
            <button className="search-button" onClick={addFriendHandler}>Отправить запрос дружбы</button>
        </div>
    </div>
}

export default AddFriendPage;