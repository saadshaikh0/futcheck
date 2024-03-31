import classNames from "classnames";

const MobileWorkRatePopup = ({ filter, updateFilter }) => {
  return (
    <div className="w-full mt-2">
      <p className=" text-sm ">Defensive WR</p>
      <div className="grid grid-cols-3 text-white mt-2">
        <button
          onClick={() => {
            updateFilter("dwr", 0);
          }}
          className={classNames(
            "px-3 py-2",
            filter.dwr == 0 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Low
        </button>
        <button
          onClick={() => {
            updateFilter("dwr", 1);
          }}
          className={classNames(
            "px-3 py-2",
            filter.dwr == 1 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Medium
        </button>
        <button
          onClick={() => {
            updateFilter("dwr", 2);
          }}
          className={classNames(
            "px-3 py-2",
            filter.dwr == 2 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          High
        </button>
      </div>
      <p className=" text-sm mt-2">Attacking WR</p>
      <div className="grid grid-cols-3 text-white mt-2">
        <button
          onClick={() => {
            updateFilter("awr", 0);
          }}
          className={classNames(
            "px-3 py-2",
            filter?.awr == 0 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Low
        </button>
        <button
          onClick={() => {
            updateFilter("awr", 1);
          }}
          className={classNames(
            "px-3 py-2",
            filter?.awr == 1 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          Medium
        </button>
        <button
          onClick={() => {
            updateFilter("awr", 2);
          }}
          className={classNames(
            "px-3 py-2",
            filter?.awr == 2 ? "bg-fuchsia-400" : "bg-slate-900"
          )}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default MobileWorkRatePopup;
