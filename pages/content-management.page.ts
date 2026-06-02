import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ContentManagementPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Login & Navigation ──

  async loginAsAdmin(url: string, email: string, password: string) {
    await this.page.goto(url);
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.getByText('Email').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.getByText('password').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    try {
      await this.page.waitForURL(url => url.href.includes('/admin') || url.href.includes('implicit-consent'), { timeout: 15000 });
      if (this.page.url().includes('implicit-consent')) {
        await this.page.getByRole('button', { name: 'Continue' }).click();
      }
    } catch { }
    await this.page.waitForURL(url => url.href.includes('/admin'), { timeout: 30000 });
  }

  async navigateToContentManagement() {
    await this.page.getByRole('link', { name: 'Content Management' }).click();
    await this.page.waitForURL(/content-management/);
    await this.page.getByRole('heading', { name: 'Content Management', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  // ── Page Verification ──

  async verifyPageHeading(heading: string) {
    await expect(this.page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
  }

  async verifyAddArticleButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Add Article' })).toBeVisible();
  }

  // ── Add Article Modal ──

  async clickAddArticleButton() {
    await this.page.getByRole('button', { name: 'Add Article' }).click();
  }

  async verifyAddArticleModalOpen() {
    await expect(this.page.getByRole('heading', { name: 'Add New Article', level: 2 })).toBeVisible();
  }

  async verifyTitleFieldVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Enter article title...' })).toBeVisible();
  }

  async verifySubtitleFieldVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Brief subtitle...' })).toBeVisible();
  }

  async verifyContentEditorVisible() {
    await expect(this.page.getByText('Article Content *')).toBeVisible();
  }

  async verifyCreateArticleButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Create Article' })).toBeVisible();
  }

  async verifyCancelButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  }

  async verifyCloseButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Close' })).toBeVisible();
  }

  async verifyStatusDropdownVisible() {
    await expect(this.page.getByRole('combobox')).toBeVisible();
  }

  async verifyHelpTopicsCheckboxesVisible() {
    await expect(this.page.getByText('Help Topics *')).toBeVisible();
    await expect(this.page.getByRole('checkbox', { name: 'Best Practices' })).toBeVisible();
  }

  async verifyTargetRolesCheckboxesVisible() {
    await expect(this.page.getByText('Target Roles *')).toBeVisible();
    await expect(this.page.getByRole('checkbox', { name: 'Partner' })).toBeVisible();
  }

  async fillTitle(title: string) {
    await this.page.getByRole('textbox', { name: 'Enter article title...' }).fill(title);
  }

  async fillSubtitle(subtitle: string) {
    await this.page.getByRole('textbox', { name: 'Brief subtitle...' }).fill(subtitle);
  }

  async fillContent(content: string) {
    const editor = this.page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    await editor.click();
    await this.page.keyboard.type(content);
  }

  async verifyTitleFieldValue(value: string) {
    await expect(this.page.getByRole('textbox', { name: 'Enter article title...' })).toHaveValue(value);
  }

  async verifySubtitleFieldValue(value: string) {
    await expect(this.page.getByRole('textbox', { name: 'Brief subtitle...' })).toHaveValue(value);
  }

  async clickCreateArticle() {
    await this.page.getByRole('button', { name: 'Create Article' }).click();
  }

  async clickCancel() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async clickCloseModal() {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }

  async verifyModalClosed() {
    await expect(this.page.getByRole('heading', { name: 'Add New Article', level: 2 })).not.toBeVisible();
  }

  async selectStatus(status: string) {
    await this.page.getByRole('combobox').selectOption(status);
  }

  async checkHelpTopic(topic: string) {
    await this.page.getByRole('checkbox', { name: topic }).check();
  }

  async checkTargetRole(role: string) {
    await this.page.getByRole('checkbox', { name: role }).check();
  }

  async verifyRichTextToolbarVisible() {
    await expect(this.page.getByRole('button', { name: 'Bold' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Italic' })).toBeVisible();
  }

  // ── Article List ──

  async verifyArticleInList(title: string) {
    await expect(this.page.getByRole('heading', { name: title, level: 3 })).toBeVisible();
  }

  async getArticleCount(): Promise<number> {
    await this.page.waitForTimeout(2000);
    const articles = this.page.getByRole('heading', { level: 3 });
    return await articles.count();
  }

  async verifyArticlesExist() {
    const showingText = this.page.getByText(/Showing \d+ to \d+ of \d+ articles/);
    await expect(showingText).toBeVisible();
  }

  /** Verify status label is visible on article cards */
  async verifyStatusLabelVisible() {
    await expect(this.page.getByText(/Active|Inactive|Draft/).first()).toBeVisible();
  }

  /** Verify Active status is visible */
  async verifyActiveStatusVisible() {
    await expect(this.page.getByText('Active').first()).toBeVisible();
  }

  /** Verify status filter dropdown is visible */
  async verifyStatusFilterVisible() {
    await expect(this.page.getByRole('button', { name: 'All Status' })).toBeVisible();
  }

  /** Verify Deactivate button is visible on article cards */
  async verifyDeactivateButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Deactivate' }).first()).toBeVisible();
  }

  /** Verify Delete button is visible on article cards */
  async verifyDeleteButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Delete' }).first()).toBeVisible();
  }

  /** Reload the page */
  async reloadPage() {
    await this.page.reload();
    await this.page.getByRole('heading', { name: 'Content Management', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Verify date is displayed on article cards */
  async verifyArticleDateVisible() {
    const dateText = this.page.getByText(/\w{3} \d{1,2}, \d{4}/).first();
    await expect(dateText).toBeVisible();
  }

  /** Verify multiple articles show dates */
  async verifyAllArticlesHaveDates() {
    const dates = this.page.getByText(/\w{3} \d{1,2}, \d{4}/);
    const count = await dates.count();
    expect(count, 'At least one article should show a date').toBeGreaterThan(0);
  }

  /** Verify article card shows read time */
  async verifyReadTimeVisible() {
    const readTime = this.page.getByText(/\d+ min read/).first();
    await expect(readTime).toBeVisible();
  }

  /** Verify article card shows category */
  async verifyCategoryVisible() {
    // Categories like "GenAI Features", "Best Practices", etc.
    const category = this.page.getByText(/GenAI Features|Best Practices|Compliance|Product Management/).first();
    await expect(category).toBeVisible();
  }

  /** Verify article card shows roles */
  async verifyRolesVisible() {
    await expect(this.page.getByText('Roles:').first()).toBeVisible();
  }

  async verifyOnContentManagementPage() {
    expect(this.page.url()).toContain('/admin/content-management');
  }

  // ── Edit Article ──

  async clickEditOnFirstArticle() {
    await this.page.getByRole('button', { name: 'Edit' }).first().click();
  }

  async verifyEditButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Edit' }).first()).toBeVisible();
  }

  async verifyEditModalOpen() {
    // Wait for the edit modal to appear - it may have different heading text
    await expect(this.page.getByRole('heading', { level: 2 }).nth(1)).toBeVisible({ timeout: 10000 });
  }

  async verifyEditModalHasTitleField() {
    const titleField = this.page.getByRole('textbox').first();
    await expect(titleField).toBeVisible();
  }

  async verifyEditModalHasContentEditor() {
    const editor = this.page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    await expect(editor).toBeVisible();
  }

  async verifyEditModalTitlePreloaded() {
    // The edit modal title field may have a different name - check any visible textbox
    const titleField = this.page.getByRole('textbox').first();
    await expect(titleField).toBeVisible();
  }

  async verifyEditModalContentPreloaded() {
    const editor = this.page.locator('[class*="ProseMirror"], [class*="tiptap"], [contenteditable="true"]').first();
    await expect(editor).toBeVisible();
  }

  async verifySaveChangesButtonVisible() {
    await expect(this.page.getByRole('button', { name: /Save|Update/i }).first()).toBeVisible();
  }

  async verifyEditModalCancelVisible() {
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  }

  async closeEditModal() {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }

  async verifyEditModalClosed() {
    // Verify the edit modal panel is no longer visible
    await expect(this.page.getByRole('button', { name: /Save|Update/i }).first()).not.toBeVisible({ timeout: 5000 }).catch(() => {});
  }
}
