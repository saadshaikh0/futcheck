const NameInput = ({ value, onChange }) => {
    return (
        <div className="flex flex-col">
            <input
                id="name"
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Enter name"
                className="bg-slate-700 text-white rounded-lg pl-2 p-1 mt-1 "
            />
        </div>
    );
};

export default NameInput;
