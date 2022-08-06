import unittest
from time import sleep

from selenium import webdriver

import page


class ExamsTests(unittest.TestCase):
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

    def test_exams_list_logged(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0

    def test_exams_list_not_logged(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) == 0

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
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_logout_button()
        assert examsPage.is_login_page_exists()

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
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_profile_page_button()

        url = self.driver.current_url
        assert 'profile' in url

    def test_login_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_login_page_button()

        url = self.driver.current_url
        assert 'login' in url

    def test_register_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_register_page_button()

        url = self.driver.current_url
        assert 'register' in url

    def test_FAQ_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_FAQ_page_button()

        url = self.driver.current_url
        assert 'about' in url

    def test_main_page_button_url(self):
        mainPage = page.MainPage(self.driver)
        mainPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsPage.click_main_page_button()

        url = self.driver.current_url
        assert url == self.path

    def test_question_1_exam(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_markdown_language_answer()
        question1.click_markdown_language_answer()
        assert all([question1.is_question_matches(), question1.is_answer1_matches(),
                   question1.is_answer2_matches(), question1.is_answer3_matches()])

    def test_question_1_exam_checkboxes(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)

        sleep(0.5)

        question1.click_markdown_language_answer()
        assert question1.is_markdown_language_selected()
        question1.click_markdown_language_answer()
        assert not question1.is_markdown_language_selected()

        question1.click_programming_language_answer()
        assert question1.is_programming_language_answer_selected()
        question1.click_programming_language_answer()
        assert not question1.is_programming_language_answer_selected()

        question1.click_database_answer()
        assert question1.is_database_answer_selected()
        question1.click_database_answer()
        assert not question1.is_database_answer_selected()

    def test_question_2_exam_checkboxes(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_next_question()
        question2 = page.DebugExamQuestion2Page(self.driver)

        sleep(0.5)

        question2.click_dictator_answer()
        assert question2.is_dictator_answer_selected()
        question2.click_dictator_answer()
        assert not question2.is_dictator_answer_selected()

        question2.click_war_criminal_answer()
        assert question2.is_war_criminal_answer_selected()
        question2.click_war_criminal_answer()
        assert not question2.is_war_criminal_answer_selected()

        question2.click_microsoft_CEO_answer()
        assert question2.is_microsoft_CEO_answer_selected()
        question2.click_microsoft_CEO_answer()
        assert not question2.is_microsoft_CEO_answer_selected()

    def test_question_2_exam(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_next_question()
        question2 = page.DebugExamQuestion2Page(self.driver)
        sleep(0.2)
        assert all([question2.is_question_matches(), question2.is_answer1_matches(),
                   question2.is_answer2_matches(), question2.is_answer3_matches()])

    def test_question_3_exam(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_next_question()
        sleep(0.25)
        question1.click_next_question()
        question3 = page.DebugExamQuestion3Page(self.driver)

        assert all([question3.is_question_matches(), question3.is_answer1_matches(),
                   question3.is_answer2_matches(), question3.is_answer3_matches(), question3.is_answer4_matches()])

    def test_question_3_exam_checkboxes(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'
        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_next_question()
        sleep(0.25)
        question1.click_next_question()
        question3 = page.DebugExamQuestion3Page(self.driver)

        sleep(0.5)

        question3.click_200_answer()
        assert question3.is_200_answer_selected()
        question3.click_200_answer()
        assert not question3.is_200_answer_selected()

        question3.click_201_answer()
        assert question3.is_201_answer_selected()
        question3.click_201_answer()
        assert not question3.is_201_answer_selected()

        question3.click_403_answer()
        assert question3.is_403_answer_selected()
        question3.click_403_answer()
        assert not question3.is_403_answer_selected()

        question3.click_500_answer()
        assert question3.is_500_answer_selected()
        question3.click_500_answer()
        assert not question3.is_500_answer_selected()

    def test_results_exam(self):
        USERNAME = 'test_nickname'
        PASSWORD = 'test_password'

        mainPage = page.MainPage(self.driver)
        mainPage.click_login_page_button()
        loginPage = page.LoginPage(self.driver)
        loginPage.fill_username_field(USERNAME)
        loginPage.fill_password_field(PASSWORD)
        loginPage.click_login_button()
        assert loginPage.log_off_button_exists()
        loginPage.click_exams_page_button()
        examsPage = page.ExamsPage(self.driver)
        examsList = examsPage.get_exams_list()
        assert len(examsList) > 0
        examsPage.click_continue_exam_button()
        question1 = page.DebugExamQuestion1Page(self.driver)
        question1.click_next_question()
        sleep(0.25)
        question1.click_next_question()
        sleep(0.25)
        question1.click_next_question()
        sleep(0.25)
        url = self.driver.current_url
        assert 'results' in url

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()