import { renderHook, act } from '@testing-library/react';
import { useScheduleFilters } from '../useScheduleFilters';
import { RepaymentStatus } from '@/types/enums/repaymentStatus';
import { RepaymentStatusFilter } from '@/types/enums/repaymentStatusFilter';
import { RepaymentPeriodFilter } from '@/types/enums/repaymentPeriodFilter';
import { SortDirection } from '@/types/enums/sortDirection';
import { RepaymentScheduleType } from '@/types/repaymentScheduleType';

const mockSchedules: RepaymentScheduleType[] = [
  {
    id: '1',
    scheduledDate: '2024-01-15',
    paidDate: '2024-01-15',
    amount: 15000,
    status: RepaymentStatus.Completed,
    paymentMethod: 'Bank Transfer',
    paymentCategory: 'Monthly Payment'
  },
  {
    id: '2',
    scheduledDate: '2024-02-15',
    paidDate: null,
    amount: 15000,
    status: RepaymentStatus.Scheduled,
    paymentMethod: 'Bank Transfer',
    paymentCategory: 'Monthly Payment'
  },
  {
    id: '3',
    scheduledDate: '2024-01-20',
    paidDate: null,
    amount: 20000,
    status: RepaymentStatus.Delayed,
    paymentMethod: 'Credit Card',
    paymentCategory: 'Late Payment'
  }
];

describe('useScheduleFilters', () => {
  it('初期状態で正しい値を返す', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.statusFilter).toBe(RepaymentStatusFilter.ALL);
    expect(result.current.periodFilter).toBe(RepaymentPeriodFilter.ALL);
    expect(result.current.sortDirection).toBe(SortDirection.DESC);
    expect(result.current.itemsPerPage).toBe(5);
    expect(result.current.totalScheduleCount).toBe(3);
    expect(result.current.paginatedSchedules).toHaveLength(3);
  });

  it('ステータスフィルターが正しく動作する', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules })
    );

    act(() => {
      result.current.setStatusFilter(RepaymentStatusFilter.COMPLETED);
    });

    expect(result.current.statusFilter).toBe(RepaymentStatusFilter.COMPLETED);
    expect(result.current.totalScheduleCount).toBe(1);
    expect(result.current.paginatedSchedules[0].status).toBe(RepaymentStatus.Completed);
  });

  it('検索フィルターが正しく動作する', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules })
    );

    act(() => {
      result.current.setSearchTerm('20000');
    });

    expect(result.current.searchTerm).toBe('20000');
    expect(result.current.totalScheduleCount).toBe(1);
    expect(result.current.paginatedSchedules[0].amount).toBe(20000);
  });

  it('ソート方向が正しく動作する', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules })
    );

    // DESC（デフォルト）: 新しい日付が先
    expect(result.current.paginatedSchedules[0].scheduledDate).toBe('2024-02-15');

    act(() => {
      result.current.setSortDirection(SortDirection.ASC);
    });

    // ASC: 古い日付が先
    expect(result.current.paginatedSchedules[0].scheduledDate).toBe('2024-01-15');
  });

  it('ページネーションが正しく動作する', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules, itemsPerPage: 2 })
    );

    expect(result.current.totalPages).toBe(2);
    expect(result.current.paginatedSchedules).toHaveLength(2);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedSchedules).toHaveLength(1);
  });

  it('複数のフィルターを組み合わせて使用できる', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: mockSchedules })
    );

    act(() => {
      result.current.setStatusFilter(RepaymentStatusFilter.COMPLETED);
      result.current.setSearchTerm('15000');
    });

    expect(result.current.totalScheduleCount).toBe(1);
    expect(result.current.paginatedSchedules[0].status).toBe(RepaymentStatus.Completed);
    expect(result.current.paginatedSchedules[0].amount).toBe(15000);
  });

  it('空の配列でも正しく動作する', () => {
    const { result } = renderHook(() =>
      useScheduleFilters({ schedules: [] })
    );

    expect(result.current.totalScheduleCount).toBe(0);
    expect(result.current.paginatedSchedules).toHaveLength(0);
    expect(result.current.totalPages).toBe(0);
  });
});