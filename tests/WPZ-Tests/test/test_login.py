import unittest
from selenium import webdriver
import page
import string
import random

class LoginTests(unittest.TestCase):
    """A sample test class to show how page object works"""
    PATH = 'C:\Program Files (x86)\chromedriver.exe'
    def setUp(self):
        self.driver = webdriver.Chrome(self.PATH)
        self.path = "http://localhost:3000/"
        self.driver.get(self.path)

    '''def test_search_in_python_org(self):
        """Tests python.org search feature. Searches for the word "pycon" then
        verified that some results show up.  Note that it does not look for
        any particular text in search results page. This test verifies that
        the results were not empty."""

        #Load the main page. In this case the home page of Python.org.
        main_page = page.MainPage(self.driver)
        #Checks if the word "Python" is in title
        self.assertTrue(main_page.is_title_matches(), "python.org title doesn't match.")
        #Sets the text of search textbox to "pycon"
        main_page.search_text_element = "pycon"
        main_page.click_go_button()
        search_results_page = page.SearchResultsPage(self.driver)
        #Verifies that the results page is not empty
        self.assertTrue(search_results_page.is_results_found(), "No results found.")
'''
    def test_title(self):
        mainPage = page.MainPage(self.driver)
        assert mainPage.is_title_matches()

    def test_login_incorrect_credentials(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(50, 70)))))
        password = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(50, 70))))
        loginPage.fill_password_field(password)
        loginPage.click_login_button()
        assert loginPage.credentials_not_matching()

    def test_correct_login(self):

        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_main_page_button()

    def test_dont_have_account(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.click_dont_an_account_link()
        url = self.driver.current_url
        assert 'register' in url

    def test_logout(self):

        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_logout_button()
        assert loginPage.is_login_page_exists()

    def test_profile_page(self):

        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.is_profile_button_exists()
        loginPage.click_profile_page_button()

        url = self.driver.current_url
        assert 'profile' in url


    def test_exams_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.click_exams_page_button()

        url = self.driver.current_url
        assert 'tests' in url

    def test_register_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.click_register_page_button()

        url = self.driver.current_url
        assert 'register' in url

    def test_FAQ_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.click_FAQ_page_button()

        url = self.driver.current_url
        assert 'about' in url

    def test_main_page_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.click_main_page_button()

        url = self.driver.current_url
        assert url == self.path

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
