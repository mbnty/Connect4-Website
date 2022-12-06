<?php

class Player implements JsonSerializable {
	public $Name;
	public $TotalGames;
    public $Wins;
    public $TimePlayed;
    public $TurnCount;

    public function __construct() { // the constructor has an input
        
        $this->Name = "";
        $this->TotalGames = 0;
        $this->Wins = 0;
        $this->TimePLayed = 0;
        $this->TurnCount = 0;
       }

       public function jsonSerialize() {
        return [
            'Name' => $this->Name,
            'TotalGames' => $this->TotalGames,
            'Wins' => $this->Wins,
            'TimePLayed' => $this->TimePLayed,
            'TurnCount' => $this->TurnCount,
            ];
    }

    public function Set($json)
	{
		$this->Name=$json['Name'];
		$this->TotalGames=$json['TotalGames'];
		$this->Wins=$json['Wins'];
		$this->TimePlayed=$json['TimePlayed'];
		$this->TurnCount=$json['TurnCount'];
	}

    public function Display() {
		$v=json_encode($this);
		echo $v;
	}
	
	public function GetString() {
		return json_encode($this);
	}
}

?>