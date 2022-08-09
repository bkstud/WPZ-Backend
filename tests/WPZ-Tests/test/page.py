import time

from selenium.webdriver import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

from element import BasePageElement
from locators import MainPageLocators, RegisterPageLocators, LoginPageLocators, FAQPageLocators, ExamPageLocators, \
    DebugExamQuestion1PageLocators, DebugExamQuestion2PageLocators, DebugExamQuestion3PageLocators


class SearchTextElement(BasePageElement):
    """This class gets the search text from the specified locator"""

    # The locator for search box where search string is entered


class BasePage(object):
    """Base class to initialize the base page that will be called from all
    pages"""

    def __init__(self, driver):
        self.driver = driver


class MainPage(BasePage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def click_login_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.LOGIN_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_register_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.REGISTER_PAGE_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_FAQ_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.FAQ_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_exams_page_button(self):
        """Triggers the search"""
        try:
            time.sleep(0.25)
            element = self.driver.find_element(*MainPageLocators.EXAMS_BUTTON)
            element.click()
        except :
            print(AttributeError("cannot find element"))

    def click_logout_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.LOG_OFF_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_profile_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.PROFILE_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_main_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*MainPageLocators.MAIN_PAGE_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_login_page_exists(self):
        try:
            self.driver.find_element(*MainPageLocators.LOGIN_BUTTON)
            return True
        except:
            return False

    def is_profile_button_exists(self):
        try:
            self.driver.find_element(*LoginPageLocators.PROFILE_BUTTON)
            return True
        except:
            return False


class RegisterPage(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def click_already_have_an_account_link(self):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.ALREADY_HAVE_AN_ACCOUNT_LINK)
        self.driver.execute_script('arguments[0].click()', element)

    def get_email_validation_message(self):
        """Triggers the search"""

        valMessage = self.driver.find_element(*RegisterPageLocators.EMAIL_FIELD).get_attribute("validationMessage")
        return valMessage

    def passwords_not_matching(self):
        try:
            element = self.driver.find_element(*RegisterPageLocators.PASSWORDS_NOT_MATCHING_ERROR)
            return True
        except:
            return False

    def user_exists(self):
        try:
            element = self.driver.find_element(*RegisterPageLocators.USER_EXISTS_ERROR)
            return True
        except:
            return False

    def click_register_page_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.REGISTER_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def fill_name_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.NAME_FIELD)
        element.send_keys(value)
        # element.send_keys(Keys.RETURN)

    def fill_surname_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.SURNAME_FIELD)
        element.send_keys(value)

    def fill_username_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.NICK_FIELD)
        element.send_keys(value)

    def fill_email_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.EMAIL_FIELD)
        element.send_keys(value)

    def fill_password_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.PASSWORD_FIELD)
        element.send_keys(value)

    def fill_confirm_password_field(self, value: str):
        """Triggers the search"""

        element = self.driver.find_element(*RegisterPageLocators.CONFIRM_PASSWORD_FIELD)
        element.send_keys(value)


class LoginPage(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        print(self.driver.title)
        return "React" in self.driver.title

    def click_dont_an_account_link(self):
        """Triggers the search"""

        element = self.driver.find_element(*LoginPageLocators.DONT_HAVE_AN_ACCOUNT_LINK)
        self.driver.execute_script('arguments[0].click()', element)

    def click_login_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*LoginPageLocators.LOGIN_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)
    def log_off_button_exists(self):
        try:
            self.driver.find_element(*LoginPageLocators.LOG_OFF_BUTTON)
            return True
        except:
            return False

    def credentials_not_matching(self):
        try:
            element = self.driver.find_element(*LoginPageLocators.CREDENTIALS_NOT_MATCHING_ERROR)
            return True
        except:
            return False

    def fill_username_field(self, value: str):
        element = self.driver.find_element(*LoginPageLocators.NICK_FIELD)
        element.send_keys(value)

    def fill_password_field(self, value: str):
        element = self.driver.find_element(*LoginPageLocators.PASSWORD_FIELD)
        element.send_keys(value)


class FAQPage(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def click_first_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_1_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_first_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_1_BUTTON)
        return element.get_attribute("open")

    def click_second_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_2_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_second_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_2_BUTTON)
        return element.get_attribute("open")

    def click_third_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_3_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_third_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_3_BUTTON)
        return element.get_attribute("open")

    def click_fourth_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_4_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_fourth_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_4_BUTTON)
        return element.get_attribute("open")

    def click_fifth_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_5_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_fifth_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_5_BUTTON)
        return element.get_attribute("open")

    def click_sixth_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_6_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_sixth_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_6_BUTTON)
        return element.get_attribute("open")

    def click_seventh_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_7_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_seventh_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_7_BUTTON)
        return element.get_attribute("open")

    def click_eighth_question_button(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_8_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def is_eight_question_open(self):
        """Triggers the search"""

        element = self.driver.find_element(*FAQPageLocators.DETAILS_8_BUTTON)
        return element.get_attribute("open")


class ExamsPage(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def click_id_menu_button(self):
        element = self.driver.find_element(*ExamPageLocators.ID_MENU_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_id_filter_menu_button(self):
        element = self.driver.find_element(*ExamPageLocators.FILTER_MENU)
        self.driver.execute_script('arguments[0].click()', element)

    def fill_id_filter_menu_value(self, val):
        element = self.driver.find_element(*ExamPageLocators.FILTER_VALUE)
        self.driver.execute_script('arguments[0].click()', element)
        element.send_keys(val)

    def click_exam_start_menu_button(self):
        element = self.driver.find_element(*ExamPageLocators.EXAM_START_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)

    def click_exam_start_button(self):
        time.sleep(0.5)
        element = self.driver.find_element(*ExamPageLocators.START_EXAM_BUTTON)
        element.click()

    def click_continue_exam_button(self):
        time.sleep(0.5)
        element = self.driver.find_element(*ExamPageLocators.CONTINUE_EXAM_BUTTON)
        element.click()

    def get_exams_list(self):
        """Triggers the search"""
        time.sleep(0.25)
        element = self.driver.find_element(*ExamPageLocators.EXAMS_LIST_ROOT)
        children = element.find_elements(By.XPATH, ".//*")
        return children


class DebugExamQuestion1Page(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title
    def is_question_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            return 'Co to jest HTML?' in self.driver.find_element(*DebugExamQuestion1PageLocators.QUESTION).accessible_name
        except:
            return False

    def is_answer1_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion1PageLocators.PROGRAMMING_LANGUAGE_ANSWER)
            return True
        except:
            return False

    def is_answer2_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion1PageLocators.MARKDOWN_LANGUAGE_ANSWER)
            return True
        except:
            return False

    def is_answer3_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion1PageLocators.DATABASE_ANSWER)
            return True
        except:
            return False

    def click_programming_language_answer(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.PROGRAMMING_LANGUAGE_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_programming_language_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.PROGRAMMING_LANGUAGE_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_markdown_language_answer(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.MARKDOWN_LANGUAGE_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_markdown_language_selected(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.MARKDOWN_LANGUAGE_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_database_answer(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.DATABASE_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_database_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.DATABASE_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_next_question(self):
        element = self.driver.find_element(*DebugExamQuestion1PageLocators.NEXT_QUESTION_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)


class DebugExamQuestion2Page(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def is_question_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            return 'Kim jest Władmir Putin?' in self.driver.find_element(*DebugExamQuestion2PageLocators.QUESTION).accessible_name
        except:
            return False

    def is_answer1_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            return self.driver.find_element(*DebugExamQuestion2PageLocators.DICTATOR_ANSWER_CHECKBOX).accessible_name == "dyktatorem"
        except:
            return False

    def is_answer2_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            return self.driver.find_element(*DebugExamQuestion2PageLocators.WAR_CRIMINAL_ANSWER_CHECKBOX).accessible_name == "zbrodniarzem wojennym"
        except:
            return False

    def is_answer3_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            return self.driver.find_element(*DebugExamQuestion2PageLocators.Microsoft_CEO_ANSWER_CHECKBOX).accessible_name == "szefem Micro$oftu xD"
        except:
            return False

    def click_dictator_answer(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.DICTATOR_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_dictator_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.DICTATOR_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_war_criminal_answer(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.WAR_CRIMINAL_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_war_criminal_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.WAR_CRIMINAL_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_microsoft_CEO_answer(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.Microsoft_CEO_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_microsoft_CEO_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.Microsoft_CEO_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_next_question(self):
        element = self.driver.find_element(*DebugExamQuestion2PageLocators.NEXT_QUESTION_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)


class DebugExamQuestion3Page(MainPage):
    """Home page action methods come here. I.e. Python.org"""

    # Declares a variable that will contain the retrieved text
    search_text_element = SearchTextElement()

    def is_title_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        print(self.driver.title)
        return "React" in self.driver.title

    def is_question_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion3PageLocators.QUESTION)
            return "Które z poniższych kodów HTTP świadczą o błędzie po stronie clienta?" in \
                            self.driver.find_element(*DebugExamQuestion3PageLocators.QUESTION).accessible_name
        except:
            return False

    def is_answer1_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion3PageLocators._200_ANSWER)
            return True
        except:
            return False

    def is_answer2_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion3PageLocators._201_ANSWER)
            return True
        except:
            return False

    def is_answer3_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion3PageLocators._403_ANSWER)
            return True
        except:
            return False

    def is_answer4_matches(self):
        """Verifies that the hardcoded text "Python" appears in page title"""
        try:
            self.driver.find_element(*DebugExamQuestion3PageLocators._500_ANSWER)
            return True
        except:
            return False

    def click_200_answer(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._200_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_200_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._200_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_201_answer(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._201_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_201_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._201_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_403_answer(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._403_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_403_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._403_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_500_answer(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._500_ANSWER_CHECKBOX)
        self.driver.execute_script('arguments[0].click()', element)

    def is_500_answer_selected(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators._500_ANSWER_CHECKBOX)
        return element.is_selected()

    def click_next_question(self):
        element = self.driver.find_element(*DebugExamQuestion3PageLocators.NEXT_QUESTION_BUTTON)
        self.driver.execute_script('arguments[0].click()', element)



class SearchResultsPage(BasePage):
    """Search results page action methods come here"""

    def is_results_found(self):
        # Probably should search for this text in the specific page
        # element, but as for now it works fine
        return "No results found." not in self.driver.page_source
