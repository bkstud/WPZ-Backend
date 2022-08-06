import string
import random
import unittest

from selenium import webdriver

import page


class RegisterTests(unittest.TestCase):
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

    def test_register_incorrect_email(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.fill_username_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5 ,50)))))
        password = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 50))))
        registerPage.fill_password_field(password)
        registerPage.fill_confirm_password_field(password)
        registerPage.fill_name_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        registerPage.fill_surname_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        email_ = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))) \
                    + 'gmail.com'
        registerPage.fill_email_field(email_)
        registerPage.click_register_page_button()
        valMessage = registerPage.get_email_validation_message()
        registerPage.click_main_page_button()
        assert valMessage == f"Uwzględnij znak „@” w adresie e-mail. W adresie „{email_}” brakuje znaku „@”."

    def test_register_passwords_not_matching(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.fill_username_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5 ,50)))))
        password = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 50))))
        registerPage.fill_password_field(password)
        registerPage.fill_confirm_password_field(password + '000')
        registerPage.fill_name_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        registerPage.fill_surname_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        email_ = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))) \
                    + '@gmail.com'
        registerPage.fill_email_field(email_)
        registerPage.click_register_page_button()
        assert registerPage.passwords_not_matching()
        registerPage.click_main_page_button()

    def test_register_user_exists(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)

        USERNAME = 'test_nickname'

        registerPage.fill_username_field(USERNAME)
        password = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 50))))
        registerPage.fill_password_field(password)
        registerPage.fill_confirm_password_field(password)
        registerPage.fill_name_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        registerPage.fill_surname_field(''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))))
        email_ = ''.join((random.choice(string.ascii_uppercase) for _ in range(random.randrange(5, 10)))) \
                    + '@gmail.com'
        registerPage.fill_email_field(email_)
        registerPage.click_register_page_button()
        assert registerPage.user_exists()
        registerPage.click_main_page_button()

    def test_already_have_account(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.click_already_have_an_account_link()
        url = self.driver.current_url
        assert 'login' in url

    def test_login_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.click_login_page_button()

        url = self.driver.current_url
        assert 'login' in url

    def test_exams_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.click_exams_page_button()

        url = self.driver.current_url
        assert 'tests' in url

    def test_FAQ_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.click_FAQ_page_button()

        url = self.driver.current_url
        assert 'about' in url

    def test_main_page_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_register_page_button()
        registerPage = page.RegisterPage(self.driver)
        registerPage.click_main_page_button()

        url = self.driver.current_url
        assert url == self.path

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()