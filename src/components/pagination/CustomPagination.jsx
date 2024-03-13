import { Pagination } from "react-bootstrap";
const CustomPagination = ({ pageNumber, setPageNumber, lastPage }) => {
  const handelOnClick = (number) => {
    console.log("pageNumber", pageNumber);
    console.log("lastPage", lastPage);
    console.log("number", number);
    if (number < 1) {
      return;
    } else if (number > lastPage) {
      return;
    } else {
      setPageNumber(number);
    }
  };
  return (
    <div className="pb-2">
      <Pagination size="md">
        <Pagination.First onClick={() => handelOnClick(1)} />
        <Pagination.Prev onClick={() => handelOnClick(pageNumber - 1)} />
        <Pagination.Item active onClick={() => handelOnClick(pageNumber)}>
          {pageNumber}
        </Pagination.Item>
        <Pagination.Next onClick={() => handelOnClick(pageNumber + 1)} />
        <Pagination.Last onClick={() => handelOnClick(lastPage)} />
      </Pagination>
    </div>
  );
};

export default CustomPagination;
