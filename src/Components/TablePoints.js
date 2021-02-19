import React from "react";

function MyTable(props) {
  return (
    <form>
      <h1>Points</h1>
      <table id="tb" className="tbl" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Lat</th>
            <th>Lon</th>
          </tr>
        </thead>
        <tbody>
          {props.store.currState.map((point, index) => (
            <tr key={index}>
              <td
                style={{ width: "10%" }}
                onClick={() => props.onClicks(index, props.store, props.map)}
              >
                {index + 1}
              </td>
              <td
                style={{ width: "20%" }}
                onClick={() => props.onClicks(index, props.store, props.map)}
              >
                {"Point " + (index + 1)}
              </td>
              <td onClick={() => props.onClicks(index, props.store, props.map)}>
                {point[0]}
              </td>
              <td onClick={() => props.onClicks(index, props.store, props.map)}>
                {point[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}

export default MyTable;
