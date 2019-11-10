FROM debian:9

RUN apt-get update
RUN apt-get install -y g++ python3-dev python3 python3-pip git
RUN apt-get install -y libsm6 libxext6 libxrender-dev
RUN pip3 install --upgrade pip setuptools

RUN apt-get install -y git
RUN git clone https://github.com/bertrand-sifre/Zolver.git
RUN pip3 install -r /Zolver/requirements.txt
