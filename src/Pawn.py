import subprocess
import os
import re
from random import randint


class Pawn:
    uname = None
    """User name seted on app start UI"""
    cur_dir = os.path.dirname(os.path.realpath(__file__))
    scripts_dir = os.path.join(cur_dir, 'scripts')
    scripts_list = os.listdir(scripts_dir)

    def __init__(self, uname):
        """
        Pawn constructor!
        Let magic happens......
        :param str uname: User name
        """
        self.uname = uname

    def pawn(self):
        """
        Exec all
        :return: script name
        :rtype: str
        """
        # roll_dice to get selected
        run_this = self.__roll_dice()

        # execute selected
        self.__exec_it(run_this['path'])

        # preserve/log execution
        self.__log_execution(run_this['name'])

        # return selected name
        return run_this['name']

    def __roll_dice(self):
        """
        Select pawn randomly from actual list
        :return:
        """
        selected = self.scripts_list[randint(0, len(self.scripts_list) - 1)]
        return {
            # Remove .sh from script name
            'name': re.sub('.sh$', '', selected),
            'path': os.path.join(self.scripts_dir, selected)
        }

    @staticmethod
    def __exec_it(directory):
        """
        Execute given command in dude shell
        :param str directory:
        :return:
        """
        return str(subprocess.Popen(
            directory, stdin=subprocess.PIPE, shell=True
        ))

    def __log_execution(self, cmd):
        """

        :param cmd:
        :return:
        """
        dir_logs = os.path.join(self.cur_dir, 'logs')
        dir_file = os.path.join(dir_logs, 'log.txt')
        with open(dir_file, "a") as myfile:
            myfile.write("{} just did {}.\n".format(self.uname, cmd))
