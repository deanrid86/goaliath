export default function Profile ({name, age, hobbie}) {
    return (

        <div className="bg-white m-2 p-2">
            <h1>{name}</h1>
            <p>{age}</p>
            <p>{hobbie}</p>
        </div>
    );
}