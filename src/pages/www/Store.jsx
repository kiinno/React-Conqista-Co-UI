import React, { useContext } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import SystemContext from "../../context";
import useStore from "../../hooks/useStore";

const Store = () => {
  const system = useContext(SystemContext);
  const store = useStore();

  return store.loading ? (
    <div
      className={`position-fixed top-0 bottom-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-${system.ui.theme}`}
    >
      <Spinner
        animation="grow"
        variant={system.ui.theme === "light" ? "dark" : "light"}
      />
    </div>
  ) : (
    <div className="flex-grow-1 d-flex flex-column">
      <div className={`flex-grow-1 bg-${system.ui.theme}`}>
        <Table striped variant={system.ui.theme} hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>New Price</th>
              <th>Buy</th>
            </tr>
          </thead>
          <tbody>
            {store.items.map((storeItem, i) => (
              <tr key={storeItem._id}>
                <td>{i + 1}</td>
                <td>{storeItem.name}</td>
                <td>{storeItem.description}</td>
                <td>
                  {storeItem.discount && storeItem.discount > 0 ? (
                    <del>{storeItem.price} EGP</del>
                  ) : (
                    storeItem.price + " EGP"
                  )}
                </td>
                <td>{storeItem.discount}%</td>
                <td>
                  {storeItem.discount && storeItem.discount > 0
                    ? storeItem.price -
                      (storeItem.price / 100) * storeItem.discount
                    : storeItem.price}
                  {" EGP"}
                </td>
                <td>
                  <Button variant="outline-success" size="sm">
                    Buy
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Store;
