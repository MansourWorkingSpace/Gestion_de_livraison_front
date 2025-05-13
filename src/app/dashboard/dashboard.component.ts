import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isUsersDropdownOpen = false;
  dashboardStats: any = {
    totalClients: 0,
    totalOrders: 0,
    totalRevenue: 0,
    cityDistribution: {},
    topProducts: []
  };
  monthlyStats: any = {};
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.loadDashboardStats();
    this.loadMonthlyStats();
  }

  loadDashboardStats() {
    this.statisticsService.getDashboardStats().subscribe(
      (data) => {
        this.dashboardStats = data;
      },
      (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    );
  }

  loadMonthlyStats() {
    this.statisticsService.getMonthlyStatistics(this.selectedYear).subscribe(
      (data) => {
        this.monthlyStats = data;
      },
      (error) => {
        console.error('Error loading monthly stats:', error);
      }
    );
  }

  onYearChange(event: any) {
    this.selectedYear = parseInt(event.target.value);
    this.loadMonthlyStats();
  }

  onMonthChange(event: any) {
    this.selectedMonth = parseInt(event.target.value);
  }

  toggleUsersDropdown(): void {
    this.isUsersDropdownOpen = !this.isUsersDropdownOpen;
  }

  closeDropdowns(): void {
    this.isUsersDropdownOpen = false;
  }
} 