import { test as setup } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';

const CAREGIVER_AUTH_FILE = 'tests/auth/.auth/caregiver-storage-state.json';

setup('authenticate as caregiver', async ({ page }) => {
  const caregiverPage = new CaregiverPage(page);

  await caregiverPage.loginAsCaregiver(
    'https://qa-atad.swarajability.org/caregiver-portal/',
    'gikekylu@forexnews.bg',
    'Aaditya@14'
  );

  // Save the authenticated state to file
  await page.context().storageState({ path: CAREGIVER_AUTH_FILE });
});
