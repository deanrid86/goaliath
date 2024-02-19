

export default function Button ({count, onClick}) {
    return (
        <div>
            <button onClick={onClick}>
                Clicked {count} times
            </button>
        </div>
    );

}