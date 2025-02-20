import Pagination from 'react-bootstrap/Pagination';
import styles from './paginationComponent.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const items = [];

  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className={styles.pagination}>
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {items}
      <Pagination.Next
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last 
        color='black'
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
