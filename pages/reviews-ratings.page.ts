import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ReviewsRatingsPage extends BasePage {
  // Navigation
  readonly reviewsRatingsTab: Locator;

  // Page heading
  readonly heading: Locator;
  readonly description: Locator;

  // Widgets
  readonly averageRatingWidget: Locator;
  readonly averageRatingValue: Locator;
  readonly totalReviewsWidget: Locator;
  readonly totalReviewsValue: Locator;
  readonly productsReviewedWidget: Locator;
  readonly productsReviewedValue: Locator;

  // Search and filters
  readonly searchInput: Locator;
  readonly ratingFilter: Locator;
  readonly sortByBtn: Locator;

  // Product list
  readonly productCards: Locator;
  readonly paginationInfo: Locator;

  constructor(page: Page) {
    super(page);

    this.reviewsRatingsTab = page.getByRole('link', { name: 'Reviews & Ratings' });

    this.heading = page.getByRole('heading', { name: 'Reviews & Ratings' });
    this.description = page.getByText('Monitor customer feedback and ratings for your products');

    this.averageRatingWidget = page.getByText('Average Rating');
    this.averageRatingValue = page.getByText(/\d+\.\d+/).first();
    this.totalReviewsWidget = page.getByText('Total Reviews');
    this.totalReviewsValue = page.getByText('Across all products');
    this.productsReviewedWidget = page.getByText('Products Reviewed');
    this.productsReviewedValue = page.getByText('With customer feedback');

    this.searchInput = page.getByRole('textbox', { name: 'Search by product name...' });
    this.ratingFilter = page.getByText('All Ratings');
    this.sortByBtn = page.getByRole('button', { name: 'Most Reviews' });

    this.productCards = page.getByRole('heading', { level: 3 });
    this.paginationInfo = page.getByText(/Showing \d+ to \d+ of \d+ products/);
  }

  async navigateToReviewsRatings() {
    await this.reviewsRatingsTab.click();
    await expect(this.heading).toBeVisible();
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
  }

  async verifyReviewsRatingsTabVisible() {
    await expect(this.reviewsRatingsTab).toBeVisible();
  }

  async verifyAllWidgetsVisible() {
    await expect(this.averageRatingWidget).toBeVisible();
    await expect(this.totalReviewsWidget).toBeVisible();
    await expect(this.productsReviewedWidget).toBeVisible();
  }

  async verifyAverageRatingHasValue() {
    await expect(this.averageRatingWidget).toBeVisible();
    await expect(this.page.getByText(/\/ 5\.0/)).toBeVisible();
  }

  async verifyTotalReviewsHasCount() {
    await expect(this.totalReviewsWidget).toBeVisible();
    await expect(this.totalReviewsValue).toBeVisible();
  }

  async verifyProductsReviewedHasCount() {
    await expect(this.productsReviewedWidget).toBeVisible();
    await expect(this.productsReviewedValue).toBeVisible();
  }

  async verifyUrlContainsReviewsRatings() {
    await expect(this.page).toHaveURL(/reviews-ratings/);
  }

  async clickFirstProduct() {
    await this.productCards.first().click();
  }

  async verifyProductFeedbackSummaryPageLoaded() {
    await expect(this.page.getByRole('button', { name: 'Back to Reviews' })).toBeVisible();
    await expect(this.page.getByText('Customer reviews and ratings')).toBeVisible();
  }

  async verifyProductFeedbackSummaryContent() {
    await expect(this.page.getByText('Average Rating')).toBeVisible();
    await expect(this.page.getByText('Rating Distribution')).toBeVisible();
    await expect(this.page.getByText('Total Reviews', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Latest Review')).toBeVisible();
  }

  async verifyCustomerReviewsSection() {
    await expect(this.page.getByRole('heading', { name: 'Customer Reviews' })).toBeVisible();
    await expect(this.page.getByText('All approved reviews from verified users')).toBeVisible();
  }

  async clickBackToReviews() {
    await this.page.getByRole('button', { name: 'Back to Reviews' }).click();
    await expect(this.heading).toBeVisible();
  }

  async searchByProductName(name: string) {
    await this.searchInput.fill(name);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async verifySearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifyRatingFilterVisible() {
    await expect(this.ratingFilter).toBeVisible();
  }

  async verifySortByVisible() {
    await expect(this.sortByBtn).toBeVisible();
  }

  async verifyProductListShowsRatingAndReviews() {
    await expect(this.page.getByText(/\d+ reviews/).first()).toBeVisible();
  }

  async verifyProductFeedbackRatingDistribution() {
    await expect(this.page.getByText('Rating Distribution')).toBeVisible();
  }

  async verifyCustomerReviewCards() {
    await expect(this.page.getByText(/Anonymous_/).first()).toBeVisible();
    await expect(this.page.getByRole('combobox', { name: 'Filter reviews by rating' })).toBeVisible();
    await expect(this.page.getByRole('combobox', { name: 'Sort reviews by' })).toBeVisible();
  }

  async verifyRespondToReviewButton() {
    await expect(this.page.getByRole('button', { name: 'Respond to Review' }).first()).toBeVisible();
  }

  async verifyPaginationVisible() {
    await expect(this.paginationInfo).toBeVisible();
  }
}
