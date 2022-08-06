import unittest
from selenium import webdriver
import page


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

    def test_details1_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_first_question_button()
        assert faqPage.is_first_question_open()

    def test_details2_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_second_question_button()
        assert faqPage.is_second_question_open()

    def test_details3_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_third_question_button()
        assert faqPage.is_third_question_open()

    def test_details4_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_fourth_question_button()
        assert faqPage.is_fourth_question_open()

    def test_details5_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_fifth_question_button()
        assert faqPage.is_fifth_question_open()

    def test_details6_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_sixth_question_button()
        assert faqPage.is_sixth_question_open()

    def test_details7_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_seventh_question_button()
        assert faqPage.is_seventh_question_open()

    def test_details8_clicked(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_eighth_question_button()
        assert faqPage.is_eight_question_open()

    def test_exams_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_exams_page_button()

        url = self.driver.current_url
        assert 'tests' in url

    def test_register_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_register_page_button()

        url = self.driver.current_url
        assert 'register' in url

    def test_login_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_login_page_button()

        url = self.driver.current_url
        assert 'login' in url

    def test_main_page_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_FAQ_page_button()
        faqPage = page.FAQPage(self.driver)
        faqPage.click_main_page_button()

        url = self.driver.current_url
        assert url == self.path

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
